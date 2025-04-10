import Joi from "joi";
import pgPromise from "pg-promise";

// collegamento db
const db = pgPromise()("postgres://postgres:password@localhost:5432/postgres");
const setupDb = async () => {
  db.none(`
    DROP TABLE IF EXIST planets

    CREATE TABLE planets (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
        );
    `);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Jupiter')`);
};

setupDb();

// PIANETI
type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// CALLBACK CHIAMATE
const getAll = async (req, res) => {
  const planets = await db.many(`SELECT * FROM planets;`);

  res.status(200).json(planets);
};

const getOnebyId = async (req, res) => {
  const { id } = req.params;
  //const planetById = planets.find((p) => p.id === Number(id));
  const planetById = await db.one(
    `SELECT * FROM planets WHERE id=$1;`,
    Number(id)
  );

  if (planetById) {
    res.status(200).json(planetById);
  } else {
    res.status(404).json({ message: "Planet not found" });
  }
};

const create = async (req, res) => {
  const { id, name } = req.body;
  const myNewPlanet = { id, name };

  // applichiamo la validation
  const newValidatedPlanet = schema.validate(myNewPlanet);
  // se la validazione non va a buon fine, errore, altrimenti crea un pianeta
  if (newValidatedPlanet.error) {
    return res.status(400).json({ msg: newValidatedPlanet.error });
  } else {
    // planets = [...planets, myNewPlanet];
    await db.none(`INSERT INTO planets (name) VALUES $1`, name);
    res.status(201).json({ msg: "Planet created successfully!" });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  //planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  await db.none(`UPDATE FROM planets SET name=$ WHERE id=$1;`, [id, name]);
  res.status(200).json({ msg: "Planet updated successfully!" });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  //planets = planets.filter((p) => {p.id !== Number(id); });
  await db.none(`DELETE FROM planets WHERE id=$1;`, Number(id));
  res.status(200).json({ msg: "Planet deleted successfully!" });
};

// VALIDATION
// che differenza c'è con typescript?
const schema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

export { getAll, getOnebyId, create, updateById, deleteById };
