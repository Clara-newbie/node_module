import { db } from "./db.js";
import passport from "passport";
import * as dotenv from "dotenv";
dotenv.config();
import passportJWT from "passport-jwt";
import { User } from "./types.js";

const { SECRET } = process.env;

// sorta di middleware impiegato nelle autenticazioni
passport.use(
  // oggetti opzionali + callback
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      // estrae la parte jkckbacabc da authorize.Bearer jkckbacabc
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      // estrai dal db lo user che ha per id l'id del payload preso dal token
      try {
        console.log(2, payload);

        const user: User = await db.one(
          `SELECT * From users WHERE id=$1`,
          payload.id
        );

        // se ci ritorna uno user, allora triggeriamo la cb
        return user ? done(null, user) : done(new Error("User not found"));
      } catch (error) {
        done(error);
      }
    }
  )
);
