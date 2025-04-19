import passport from "passport";
import { Request, Response, NextFunction } from "express";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: Express.User) => {
      console.log(3, user);

      if (!user || err) {
        res.status(401).json({ msg: "Unauthorized." });
      } else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
};

export default authorize;
