const fs = require("fs");
const callback = (error, data) => {
  if (error) {
    console.log("C'è stato un errore: ", error);
    return;
  }
  console.log("File creato con successo");
};

fs.writeFile(
  "newFile.txt",
  "Sono il tuo nuovo file!",
  { encoding: "utf-8" },
  callback
);
