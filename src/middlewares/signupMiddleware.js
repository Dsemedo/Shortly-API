import { signupSchema } from "../models/signup.js";
import { connectionDb } from "../database/db.js";

export async function validSchemaSignup(req, res, next) {
  const signup = req.body;

  if (signup.password !== signup.confirmPassword) {
    res.status(422).send("Senhas nao coincidem");
    return;
  }

  const { error } = signupSchema.validate(signup, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ errors });
  }

  const emailExists = await connectionDb.query(
    "SELECT * FROM users WHERE email = $1;",
    [signup.email]
  );

  if (!emailExists) {
    res.sendStatus(409);
    return;
  }

  next();
}
