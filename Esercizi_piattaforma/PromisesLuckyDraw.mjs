function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    // costante creata per stabilire la vittoria (true o false)
    const win = Boolean(Math.round(Math.random()));

    // process.nextTick() esegue la funzione che gli viene passata non appena l'operazione corrente è terminata,
    // ma prima di qualsiasi altra operazione in coda.
    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

luckyDraw("Joe").then(
  (res) => {
    console.log(res);
  },
  (loss) => {
    console.log(loss);
  }
);

luckyDraw("Caroline")
  .then((res) => {
    console.log(res);
  })
  .catch((loss) => {
    console.log(loss);
  });

luckyDraw("Sabrina").then(
  (res) => {
    console.log(res);
  },
  (loss) => {
    console.log(loss);
  }
);
