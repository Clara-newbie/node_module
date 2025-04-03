const fs = require("fs").promises;

fs.readFile("lista.txt", "utf8")
  .then((data) => {
    console.log("Contenuto del file:", data);
    return data.toUpperCase();
  })
  .then((upperCased) => {
    console.log("Contenuto maiuscolo: ", upperCased);
    return fs.writeFile("lista_upperCase.txt", upperCased);
  })
  .then(() => {
    console.log("File scritto con successo!");
  })
  .catch((err) => {
    console.error("Si è verificato un errore: ", err);
  });
