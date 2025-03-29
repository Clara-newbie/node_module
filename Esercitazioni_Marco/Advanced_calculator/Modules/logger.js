// funzioni di logging
function logOperazione(operazione, numeri, risultato) {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp} Operazione: ${operazione}, Numeri: ${numeri.join(
      ", "
    )}, Risultato: ${risultato}]`
  );
}

function logErrore(errore) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Errore: ${errore.message}`);
}

function stampaBenvenuto() {
  console.log("\n=============================");
  console.log("CALCOLATRICE NODE.JS");
  console.log("=============================");
  console.log("Operazioni disponibili:");
  console.log("Somma:                 - Somma due numeri");
  console.log("Sottrazione:           - Sottrai due numeri");
  console.log("Moltiplicazione:       - Moltiplica due numeri");
  console.log("Divisione:             - Dividi due numeri");
  console.log("Potenza:               - Eleva due numeri a potenza");
  console.log("Radice:                - Calcola la radice di due numeri");
  console.log("Percentuale:           - Calcola la percentuale due numeri");
  console.log("=============================");
  console.log("Esempio: node main.js somma 5 3\n");
}

module.exports = {
  logOperazione,
  logErrore,
  stampaBenvenuto,
};
