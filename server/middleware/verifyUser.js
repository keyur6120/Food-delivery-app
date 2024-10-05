import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import 'dotenv/config'

export const verifyToken = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      return next(createError(410, "token not reached"));
    }

    let data = req.headers.authorization
    const token = data.substring("Bearer=".length)
    // console.log(token)

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {

      if (err) {
        return next(createError(403, "Token is not valid!"));
      }

      req.user = user // Attach the user object to the request

      res.status(200).json({ valid: true})
      next()
    })

  } catch (err) {
    next("error incoming", err);
  }
};


