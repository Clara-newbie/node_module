// modulo con funzioni di calcolo
function somma(a, b) {
  return a + b;
}

function sottrazione(a, b) {
  return a - b;
}

function moltiplicazione(a, b) {
  return a * b;
}

function divisione(a, b) {
  if (b === 0) {
    throw new Error("Impossibile dividere per zero");
  }
  return a / b;
}

function potenza(base, esponente) {
  return Math.pow(base, esponente);
}

function radiceQuadrata(numero) {
  if (numero < 0) {
    throw new Error("Impossibile calcolare la radice quadrata di 0");
  }
  return Math.sqrt(numero);
}

function percentuale(numero, percentuale) {
  return (numero * percentuale) / 100;
}

module.exports = {
  somma,
  percentuale,
  sottrazione,
  moltiplicazione,
  divisione,
  radiceQuadrata,
  potenza,
};
