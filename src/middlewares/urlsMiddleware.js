import { urlSchema } from "../models/url.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function validSchemaUrl(req, res, next) {
  const fullUrl = req.body;
  const { authorization } = req.headers;

  const { error } = urlSchema.validate(fullUrl, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }

  
  try {
    if (!authorization) {
      return res.sendStatus(401);
    }

    const parts = authorization.split(" ");

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT),
      async (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "Token invalid!!" });
        } else {
          console.log(decoded);
        }

        const user = (req.userId = decoded.id);

        return next();
      };
  } catch (err) {}
}
