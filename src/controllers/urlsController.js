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
  const { id } = req.params;

  try {
    const users = await connectionDb.query(
      'SELECT urls.id, urls."shortUrl", url FROM urls WHERE urls.id = $1;',
      [id]
    );

    if (users.rows < 2) {
      res.sendStatus(404);
    } else {
      res.status(200).send(users.rows);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function openUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    await connectionDb.query(
      'UPDATE urls SET visitors = visitors+1 WHERE "shortUrl"=$1;',
      [shortUrl]
    );

    const shortUrlExists = await connectionDb.query(
      'SELECT * FROM urls WHERE urls."shortUrl" = $1;',
      [shortUrl]
    );

    if (!shortUrlExists) {
      res.sendStatus(404);
    } else {
      res.redirect(shortUrlExists.rows[0].url);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const urlExists = await connectionDb.query(
      `SELECT * FROM urls WHERE urls.id=$1;`,
      [id]
    );

    const urlId = urlExists.rows[0].userId;

    if (urlExists.rows == 0) {
      return res.sendStatus(404);
    } else if (urlId !== userId) {
      return res.sendStatus(401);
    } else {
      await connectionDb.query(`DELETE FROM urls WHERE id = $1`, [id]);
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}
