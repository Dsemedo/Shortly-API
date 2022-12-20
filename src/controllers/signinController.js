import { connectionDb } from "../database/db.js";
import { generateToken } from "../models/signin.js";
import bcrypt from "bcrypt";

export async function signinUser(req, res) {
  const { email, password } = req.body;

  try {
    const emailExists = await connectionDb.query(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    );

    if (!emailExists) {
      return res.status(401).send({ message: "User or Password not found" });
    }

    const samePassword = bcrypt.compareSync(
      password,
      emailExists.rows[0].password
    );

    if (!samePassword) {
      return res.status(401).send({ message: "User or Password not found" });
    }

    const token = generateToken(emailExists.id);

    res.status(200).send({ token });
  } catch (err) {
    res.status(422).send(err.message);
  }
}
