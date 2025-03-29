console.log("Argomenti passati:");

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// process.argv è un array automaticamente costruito dal runtime di node e contiene
// il path di node, il path del file e gli argomenti

const name = process.argv[2];
const surname = process.argv[3];

console.log(`Benvenuto ${name} ${surname}`);
