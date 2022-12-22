import { connectionDb } from "../database/db.js";

export async function getUserUrls(req, res) {
  const { authorization } = req.headers;
  const userId = res.locals.userId;

  try {
    const urlsUser = await connectionDb.query(
      `SELECT users.id, users.name, SUM(urls.visitors) AS "visitCount", JSON_AGG(JSON_BUILD_OBJECT('id', urls.id,'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls.visitors)) AS "shortenedUrls"
      FROM users
      JOIN urls
      ON users.id = urls."userId"
      WHERE users.id = $1
      GROUP BY users.id;`,
      [userId]
    );

    if (!authorization) {
      return res.sendStatus(401);
    } else {
      return res.status(200).send(urlsUser.rows);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}
