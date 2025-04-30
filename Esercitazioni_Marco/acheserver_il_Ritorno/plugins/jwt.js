const fp = require("fastify-plugin");

module.exports = fp(async (fastify) => {
  fastify.register(require("fastify-jwt"), {
    secret: "yolo", // questa chiave in produzione deve essere random e messa su .env
  });

  // aggiungiamo un metodo che poi possiamo utilizzare nel codice facendo fastify.metodo
  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply
        .code(401)
        .send({ errore: "Non sei autenticato o il tuo token è scaduto" });
    }
  });
});
