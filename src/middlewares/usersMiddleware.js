import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function validUser(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.sendStatus(401);
    }

    const parts = authorization.split(" ");

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invalid!!" });
      } else {
        console.log(decoded);
        res.locals.userId = decoded.id;
      }

      return next();
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
}
