import Joi from "joi";

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
const getAll = (req, res) => {
  res.status(200).json(planets);
};
const getOnebyId = (req, res) => {
  const { id } = req.params;
  const planetById = planets.find((p) => p.id === Number(id));

  // per onestà intellettuale, avevo inserito solo la response
  if (planetById) {
    res.status(200).json(planetById);
  } else {
    res.status(404).json({ message: "Planet not found" });
  }
};

const create = (req, res) => {
  const { id, name } = req.body;
  const myNewPlanet = { id, name };
  // applichiamo la validation
  const newValidatedPlanet = schema.validate(myNewPlanet);

  // se la validazione non va a buon fine, errore, altrimenti crea un pianeta
  if (newValidatedPlanet.error) {
    return res.status(400).json({ msg: newValidatedPlanet.error });
  } else {
    planets = [...planets, myNewPlanet];
    res.status(201).json({ msg: "Planet created successfully!" });
  }
};

const updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "Planet updated successfully!" });
};

const deleteById = (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => {
    p.id !== Number(id);
  });

  res.status(200).json({ msg: "Planet deleted successfully!" });
};

// VALIDATION
// che differenza c'è con typescript?
const schema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

export { getAll, getOnebyId, create, updateById, deleteById };
