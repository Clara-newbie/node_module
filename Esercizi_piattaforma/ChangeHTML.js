import { createServer } from "node:http";

const server = createServer((request, response) => {
  // verifichiamo che la request arrivi
  console.log("request received");

  response.statusCode = 200;

  // così il server sa che la response dovrà essere costituita da un HTML
  response.setHeader("Content-Type", "text/html");

  // RICORDA che il server gestisce stringhe di informazioni
  response.end(
    "<html><body><h1>This is the server response c:</h1></body></html>"
  );
});

// il server accetta qui le requests del client
server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});

// CURL A CHE SERVE?
