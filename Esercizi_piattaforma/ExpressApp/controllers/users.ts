import jwt from "jsonwebtoken";
import { db } from "./../db.js";
import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { User } from "../types.js";

const logIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await db.one(`SELECT * FROM users WHERE username=$1`, username);

  if (user && user.password === password) {
    // le due "" sono per fare appacificare Typescript
    const { SECRET = "" } = process.env;
    // l'id lo estraiamo dal db, lo username lo passa il client
    const payload = {
      id: user.id,
      username,
    };

    // creiamo un token che abbia per signature = SECRET, per payload quello che abbiamo messo insieme su,
    // e per header crea un default: { alg: 'HS256', typ: 'JWT' }
    const token = jwt.sign(payload, SECRET);
    // carichiamo il token nel db allo user by id
    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);

    res.status(200).json({ id: user.id, username, token });
  } else {
    res.status(400).json({ msg: "Username or password incorret." });
  }
};

const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = db.oneOrNone(`SELECT * FROM users Where username=$1`, username);

  if (user) {
    res.status(409).json({ msg: "Username already in use." });
  } else {
    // estraiamo l'id creato dal db per lo user
    const { id } = await db.one(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`,
      [username, password]
    );

    res.status(201).json({ id, msg: "Signup successful. Now you can log in." });
  }
};

const logOut = async (req: Request, res: Response) => {
  const user: any = req.user;
  await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null]);
  res.status(200).json({ msg: "Logout successful." });
};

const getDetails = async (req: Request, res: Response) => {
  const user = req.user as User;
  console.log(1, user);

  if (user?.id) {
    const userDetails = await db.oneOrNone(
      `SELECT * FROM users WHERE id=$1`,
      user.id
    );
    res.status(200).json({ userDetails });
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

export { logIn, signUp, logOut, getDetails };
