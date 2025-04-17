import "./passport.js";
import morgan from "morgan";
import dotenv from "dotenv";
import multer from "multer";
import express from "express";
import "express-async-errors";
import {
  getAll,
  getOnebyId,
  create,
  createImage,
  updateById,
  deleteById,
} from "./controllers/planets";
import authorize from "./authorize.js";
import { logIn, signUp, logOut } from "./controllers/users.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

dotenv.config();

const app = express();
const dbPort = process.env.DB_PORT;

// USE è un metodo usato per configurare
app.use(morgan("dev")); // Cosa fa MORGAN?
app.use(express.json());
app.listen(dbPort, () => {
  console.log(`App listening on http://localhost${dbPort}`);
});

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOnebyId);

app.post("/api/planets", create);

app.post("api/users/login", logIn);

app.post("api/users/signup", signUp);

app.get("api/users/logout", authorize, logOut);

app.post("/api/planets/:id/image", upload.single("image"), createImage);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);
