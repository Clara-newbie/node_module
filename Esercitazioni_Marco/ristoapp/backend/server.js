const fastify = require("fastify")({ logger: true });
const fastifyCors = require("@fastify/cors");
const fastifyPostgres = require("fastify-postgres");
const fastifyJwt = require("fastify-jwt");

// registrazione plugin
fastify.register(fastifyCors, { origin: true });

fastify.register(fastifyPostgres, {
  connectionString: "postgres://postgres:password@localhost:5432/ristoapp",
});

fastify.register(fastifyJwt, {
  secret: "26d5e5965d4745da69855fb6a7b99af1db905450bfb7a2395b4be02e4e58c5da",
});

// decorate crea una funzione che puoi usare in qualsiasi punto del codice
fastify.decorate("authenticate", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// registriamo le rotte
fastify.register(require("./routes/auth"));

fastify.get("/", async () => {
  return { status: "Server OK" };
});

// funzione di avvio
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
