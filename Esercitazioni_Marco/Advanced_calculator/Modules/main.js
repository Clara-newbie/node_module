const { stampaBenvenuto } = require("./modules/logger");

stampaBenvenuto();

const calculator = require("./modules/calculator");
const logger = require("./modules/logger");

const args = process.argv.slice(2);

function main() {
  if (args.length === 0) {
    logger.stampaBenvenuto();
    process.exit(0);
  }

  const operazione = args[0].toLowerCase();
  const numeri = args.slice(1).map(Number);

  if (numeri.some(isNaN)) {
    logger.logErrore(new Error("Gli argomenti devono essere numeri validi"));
    process.exit(1);
  }

  try {
    let risultato;

    switch (operazione) {
      case "somma":
        if (numeri.length < 2)
          throw new Error("L'operazione richiede almeno due numeri");
        risultato = calculator.somma(numeri[0], numeri[1]);
        break;
      default:
        throw new Error("Operazione non supportata: " + operazione);
    }
  } catch (error) {
    logger.logErrore(error);
    process.exit(1);
  }

  logger.logOperazione(operazione, numeri, risultato);
}

main();
