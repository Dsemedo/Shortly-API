import { connectionDb } from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signinUser(req, res) {
  const { email, password } = req.body;

  try {
    const emailExists = await connectionDb.query(
      "SELECT * FROM users WHERE email = $1;",
      [email]
    );
    const samePassword = bcrypt.compareSync(
      password,
      emailExists.rows[0].password
    );

    if (!emailExists) {
      return res.status(401).send({ message: "User or Password not found" });
    }

    if (!samePassword) {
      return res.status(401).send({ message: "User or Password not found" });
    }

    const generateToken = (id) =>
      jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

      const token = generateToken(emailExists.rows[0].id);

    res.status(200).send({ token });
  } catch (err) {
    res.status(422).send(err.message);
  }
}
