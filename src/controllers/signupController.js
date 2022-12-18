import bcrypt from "bcrypt";
import connectionDb from "../db.js";

export async function createUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if ((name || email || password || confirmPassword) == null) {
    res.status(422).send("Campos invalidos");
    return;
  }

  if (password !== confirmPassword) {
    res.status(422).send("Senhas nao coincidem");
    return;
  }

  let passwordEncripted = bcrypt.hashSync(password, 10);

  try {
    await connectionDb.query(
      "INSERT INTO users(name, email, password) VALUES ($1, $2, $3);",
      [name, email, passwordEncripted]
    );
    res.send(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
