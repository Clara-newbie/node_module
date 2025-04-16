import jwt from "jsonwebtoken";
import { db } from "./../db.js";
import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";

const logIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await db.one(`SELECT * FROM users WHERE username=$1`, username);

  if (user && user.password === password) {
    const { SECRET = "" } = process.env;
    const payload = {
      id: user.id,
      username,
    };

    const token = jwt.sign(payload, SECRET);
    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);

    res.status(200).json({ id: user.id, username, token });
  } else {
    res.status(400).json({ msg: "Username or password incorret." });
  }
};

export { logIn };
