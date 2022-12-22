import bcrypt from "bcrypt";
import { connectionDb } from "../database/db.js";

export async function createUser(req, res) {
  const { name, email, password } = req.body;

  let passwordEncripted = bcrypt.hashSync(password, 10);

  try {
    await connectionDb.query(
      "INSERT INTO users(name, email, password) VALUES ($1, $2, $3);",
      [name, email, passwordEncripted]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUser(req, res) {
  try {
    const users = await connectionDb.query("SELECT * FROM users;");
    res.send(users.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
