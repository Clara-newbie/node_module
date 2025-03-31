import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "application/json");

  // RICORDA che il server gestisce stringhe di informazioni
  response.end(JSON.stringify({ location: "Mars" }));
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
