import { loginSchema } from "../models/login.js";
import { connectionDb } from "../database/db.js";
import bcrypt from "bcrypt";

export async function validSchemaLogin(req, res, next) {
  const {login} = req.body;

  const { error } = loginSchema.validate(login, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ errors });
  }

  const emailExists = await connectionDb.query(
    "SELECT * FROM users WHERE email = $1;",
    [login.email]
  );

  if (!emailExists) {
    res.sendStatus(409);
    return;
  }

  const passwordUser = await connectionDb.query(
    "SELECT * FROM users WHERE password=$1;",
    [login.password]
  );

  const bcrypt.compareSync(login.password, passwordUser);

}
