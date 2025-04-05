import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import "express-async-errors";

dotenv.config();

const app = express();
const dbPort = process.env.DB_USER; // 3000

// è un metodo usato per configurare
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.json(planets);
});
app.listen(dbPort, () => {
  console.log(`App listening on http://localhost${dbPort}`);
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
