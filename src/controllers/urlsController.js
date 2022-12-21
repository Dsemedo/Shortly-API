import { connectionDb } from "../database/db.js";
import { customAlphabet } from "nanoid";

export async function postUrl(req, res) {
  const { url } = req.body;
  const nanoid = customAlphabet("1234567890abcdef", 6);
  const shortUrl = nanoid();
  const userId = res.locals.userId;

  try {
    await connectionDb.query(
      'INSERT INTO urls(url, "shortUrl", "userId") VALUES ($1, $2, $3);',
      [url, shortUrl, userId]
    );
    res.status(201).send({ shortUrl: shortUrl });
  } catch (err) {
    res.status(401).send(err.message);
  }
}

export async function getUrl(req, res) {
  try {
    const users = await connectionDb.query("SELECT * FROM urls;");
    res.send(users.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
