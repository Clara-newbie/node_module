const fastify = require("fastify")({
  logger: true,
});
const { timeStamp } = require("console");
const fs = require("fs/promises");
const path = require("path");

fastify.register(require("@fastify/cors"), {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// ROTTA PRINCIPALE
fastify.get("/", async (request, replay) => {
  return {
    status: "online",
    message: "Acheserver_il_Ritorno operativo",
    timestamp: new Date().toISOString(),
  };
});

// ROTTA SECONDARIA
fastify.setNotFoundHandler((request, replay) => {
  replay.code(404).send({
    error: "Not Found",
    message: `Rotta ${request.method} ${request.url} non trovata`,
    timestamp: new Date().toISOString(),
  });
});

// ROTTA DI ERRORE
fastify.setErrorHandler((error, request, replay) => {
  const statusCode = error.statusCode || 500;

  fastify.log.error(error);

  replay.code(statusCode).send({
    error: statusCode >= 500 ? "Errore del server" : "Errore della richiesta",
    message: error.message || "Siè verificato un errore",
    timeStamp: new Date().toISOString(),
  });
});

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
