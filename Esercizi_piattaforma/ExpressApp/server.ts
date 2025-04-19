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
import "./passport.js";
import { logIn, signUp, logOut, getDetails } from "./controllers/users.js";

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

app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.listen(dbPort, () => {
  console.log(`App listening on http://localhost:${dbPort}`);
});

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOnebyId);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.post("/api/planets/:id/image", upload.single("image"), createImage);

app.post("/api/users/login", logIn);

app.post("/api/users/signup", signUp);

app.get("/api/users/details", authorize, getDetails);

app.get("/api/users/logout", authorize, logOut);
