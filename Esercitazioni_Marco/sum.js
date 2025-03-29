const args = process.argv.slice(2); // iniziamo a contare dal secondo item

// controllo: se l'array è vuoto
if (args.length === 0) {
  console.log("Pliz fornisci dati da sommare");
  console.log("Esempio: node sum.js 5 10 15");
  process.exit(1); // codice di stato per un'uscita di errore, un po' come return
}

let sum = 0;
const numbers = [];

for (const arg of args) {
  const num = parseFloat(arg); // converte da stringa a numero

  // Se il parse da stringa non risulta in un numero, restituisce NaN
  if (isNaN(num)) {
    console.log(`Errore: "${arg}" non è un numero valido`);
    process.exit(1);
  }
  numbers.push(num);
  sum += num;
}

console.log(`Numeri: ${numbers.join(" + ")}`);
console.log(`Somma: ${sum}`);
