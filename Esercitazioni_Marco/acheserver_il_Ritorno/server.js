const fastify = require("fastify")({
  logger: true,
});
const { timeStamp } = require("console");
const fs = require("fs/promises");
const path = require("path");
const fp = require("fastify-plugin");
const { request } = require("http");

fastify.register(require("@fastify/cors"), {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

const userDataPlugin = fp(async function (fastify, options) {
  const dataDir = path.join(__dirname, "data");
  await fs.mkdir(dataDir, {
    recursive: true,
  });

  fastify.decorate("getUserData", async function (userId) {
    const userFilePath = path.join(dataDir, `user_${userId}.json`);
    try {
      const data = await fs.readFile(userFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  });
});

fastify.decorate("saveUserData", async function (userId, data) {
  const userFilePath = path.join(dataDir, `user_${userId}.json`);
  await fs.writeFile(userFilePath, JSON.stringify(data, null, 2)); // il due è un dato per la formattazione
  return true;
});

fastify.register(userDataPlugin);

// ROTTA PRINCIPALE
fastify.get("/", async (request, reply) => {
  return {
    status: "online",
    message: "Acheserver_il_Ritorno operativo",
    timestamp: new Date().toISOString(),
  };
});

// ROTTA SECONDARIA
fastify.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    error: "Not Found",
    message: `Rotta ${request.method} ${request.url} non trovata`,
    timestamp: new Date().toISOString(),
  });
});

// ROTTA DI ERRORE
fastify.setErrorHandler((error, request, reply) => {
  const statusCode = error.statusCode || 500;

  fastify.log.error(error);

  reply.code(statusCode).send({
    error: statusCode >= 500 ? "Errore del server" : "Errore della richiesta",
    message: error.message || "Siè verificato un errore",
    timeStamp: new Date().toISOString(),
  });
});

// rotta GET /users che ritorna un array con tutti gli utenti

// rotta GET (dinamica) /users/:id che ritorna il singolo utente by ID

// rotta POST nuovo utente o update esistente /users/:id

// rotta DELETE /users/:id che rimuove l'utente

// registrazione di rotte API con prefisso
fastify.register(
  async function apiRoutes(fastify, options) {
    // percorso ai dati
    fastify.get("/users", async (request, reply) => {
      const dataDir = path.join(__dirname, "data"); // dirname è cartella corrente, data è quella di arrivo
      // file contenuti dentro "data"
      const files = await fs.readdir(dataDir);

      // filtriamo i file prendendo solo quelli che ci servono
      const userFiles = files.filter(
        (file) => file.startsWith("user_") && file.endsWith(".json")
      );
      // predisponiamo l'array di risultati
      const users = [];
      // cicliamo l'array di file per prendere i contenuti ed inserirli dentro users
      for (const file of userFiles) {
        const data = await fs.readFile(path.join(dataDir, file), "utf-8");
        const user = JSON.parse(data);

        // rimuoviamo ilc ampo password dai risultati
        delete user.password;
        users.push(user);
      }

      // ritorniamo l'oggetto con tutti gli users
      return {
        users,
      };
    });

    fastify.post("/users/:id", async (request, reply) => {
      const { id } = request.params; // id passato nell'url

      const newUserData = request.body;

      // verifichiamo che l'id del parametro corrisponda all'id del body
      if (newUserData.id && newUserData !== id) {
        reply.code(400).send({
          error: "Id utente nel body non corrisponde all'id del percorso",
        });
      }

      newUserData.updateAt = newDate().toISOString();
      // usiamo l'utlity creata con fastify.decorate
      const existingUser = await fastify.getUserData(id);

      if (!existingUser) {
        newUserData.createdAt = newUserData.updatedAt;
      }

      await fastify.saveUserData(id, newUserData);
      reply.code(existingUser ? 200 : 201); // 201 si usa quando si crea con successo una nuova entità
      reply.send({
        success: true,
        message: existingUser ? "Utente aggiornato" : "Utente creato",
        user: newUserData,
      });
    });

    fastify.delete("/users/:id", async (request, reply) => {
      const { id } = request.params;
      const userFilePath = path.join(__dirname, "data", `user_${id}.json`);

      try {
        await fs.access(userFilePath);
      } catch (error) {
        if (error.code === "ENOENT") {
          reply.code(404);
          return {
            error: "Utente non trovato",
          };
        }
        throw error;
      }

      await fs.unlink(userFilePath);

      return {
        success: true,
        message: `Utente ${id} cancellato`,
      };
    });
  },

  {
    prefix: "/api",
  }
);

// FUNZIONE AVVIO DEL SERVER
const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || "0.0.0.0";
    await fastify.listen({
      port: PORT,
      host: HOST,
    });
    console.log(
      `Server in ascolto si ${fastify.server.address().address} ${
        fastify.server.address().port
      }`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

// https://www.postgresql.org/download/
