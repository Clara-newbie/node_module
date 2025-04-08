import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import "express-async-errors";

// a che serve?
dotenv.config();

const app = express();
const dbPort = process.env.DB_PORT; // 3000

// USE è un metodo usato per configurare
app.use(morgan("dev")); // Cosa fa MORGAN?
app.use(express.json());
app.listen(dbPort, () => {
  console.log(`App listening on http://localhost${dbPort}`);
});

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planetById = planets.find((p) => p.id === Number(id));

  // per onestà intellettuale, avevo inserito solo la response
  if (planetById) {
    res.status(200).json(planetById);
  } else {
    res.status(404).json({ message: "Planet not found" });
  }
});

app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const myNewPlanet = { id, name };
  planets = [...planets, myNewPlanet];

  res.status(201).json({ msg: "Planet created successfully!" });
});

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "Planet updated successfully!" });
});

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => {
    p.id !== Number(id);
  });

  res.status(200).json({ msg: "Planet deleted successfully!" });
});

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
