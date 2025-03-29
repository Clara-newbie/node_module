const args = process.argv.slice(2); // iniziamo a contare dal secondo item

function main() {
  // controllo: se l'array è vuoto
  if (args.length === 0) {
    showHelp();
    process.exit(1); // codice di stato per un'uscita di errore, un po' come return
  }

  let operation = "somma";
  let numbers = [...args];

  const validOperations = ["somma", "moltiplica", "media", "stats"];
  if (validOperations.includes(args[0].toLowerCase())) {
    operation = args[0].toLowerCase();
    numbers = args.slice(1); // rimuovi il primo elemento, ossia l'operazione;
  }
  if (numbers.length === 0) {
    console.log("Per favore fornisci i numeri da calcolare");
    console.log(`Esempio: node calculator.js ${operation} 5 10 15`);
    process.exit(1);
  }

  const parsedNumbers = [];

  for (const num of numbers) {
    const parsedNum = parseFloat(num);

    if (isNaN(parsedNum)) {
      console.log(`Errore: "${num} non è un numero valido"`);
      process.exit(1);
    }

    parsedNumbers.push(parsedNum);
  }
  switch (operation) {
    case "somma":
      performSum(parsedNumbers, true);
      break;
    case "moltiplica":
      performMult(parsedNumbers, true);
      break;
    case "media":
      performAverage(parsedNumbers, true);
      break;
    case "stats":
      performStats(parsedNumbers, true);
      break;
    default:
      console.log("Operazione non riconosciuta");
      showHelp();
      break;
  }
}
function printResult(numbers, result, separator) {
  const stringSeparator = `${separator}`;
  console.log(`Numeri: ${numbers.join(stringSeparator)}`);
  console.log(`Risultato operazione: ${result}`);
}

function performSum(numbers, printInfo = false) {
  const sum = numbers.reduce((total, num) => total + num, 0);
  if (printInfo) printResult(numbers, sum, " + ");
  return sum;
}
function performMult(numbers, printInfo = false) {
  const mult = numbers.reduce((total, num) => total * num, 1);
  if (printInfo) printResult(numbers, mult, " x ");
  return mult;
}
function performAverage(numbers, printInfo = false) {
  const sum = numbers.reduce((total, num) => total + num, 0);
  const average = sum / numbers.length;
  if (printInfo) printResult(numbers, average, ", ");
  return average;
}
function performStats(numbers) {
  const sum = performSum(numbers);
  const average = performAverage(numbers);
  const mult = performMult(numbers);
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  console.log("\n=== STATISTICHE ===");
  console.log(`Numeri: ${numbers.join(", ")}`);
  console.log(`Totale numeri: ${numbers.length}`);
  console.log(`Somma: ${sum}`);
  console.log(`Prodotto: ${mult}`);
  console.log(`Media: ${average}`);
  console.log(`Min: ${min}`);
  console.log(`Max: ${max}`);
  console.log(`Range (max-min): ${max - min}`);
}

function showHelp() {
  console.log("\nCalcolatore avanzato - Utilizzo:");
  console.log("  node calculator.js [operazione] numero1 numero2 numero3 ...");
  console.log("\nOperazioni disponibili:");
  console.log("somma, moltiplica, media, stats");
}

main();
