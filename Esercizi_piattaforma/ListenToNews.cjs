const { EventEmitter } = require("node:events");

function createNewsFeed() {
  // emette gli eventi
  const emitter = new EventEmitter();

  // NOME evento - CONTENUTO evento
  setInterval(() => {
    emitter.emit("newsEvent", "News: A thing happened in a place.");
  }, 1000);

  setInterval(() => {
    emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
  }, 4000);

  setTimeout(() => {
    emitter.emit("error", new Error("News feed connection error"));
  }, 5000);

  // La funzione ha bisogno di restituire l'oggetto emitter per consentire l'interazione esterna con l'istanza di EventEmitter che ha questi eventi configurati.
  // Dentro createNewsFeed(), viene creato un oggetto emitter con const emitter = new EventEmitter(). Questo oggetto è quello che gestisce gli eventi. Può emettere eventi con .emit() e puoi aggiungere listener per ascoltarli con .on().
  return emitter;
}

// così no?
/* emitter.on("newsEvent", (news) => {
  console.log(news);
});
emitter.on("breakingNews", (news) => {
  console.log(news);
});
emitter.on("error", (err) => {
  console.log(err);
}); */

const newsFeed = createNewsFeed();

newsFeed.on("newsEvent", (data) => {
  console.log(data);
});

newsFeed.on("breakingNews", (data) => {
  console.log(data);
});

newsFeed.on("error", (error) => {
  console.log(error);
});
