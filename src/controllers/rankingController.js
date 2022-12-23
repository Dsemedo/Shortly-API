import { connectionDb } from "../database/db.js";

export async function getRanking(req, res) {
  try {
    const ranking = await connectionDb.query(
      `SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", COALESCE(SUM(urls.visitors),0)  AS "visitCount"
        FROM users
        LEFT JOIN urls
        ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;`
    );

    return res.status(200).send(ranking.rows);
  } catch (err) {
    res.status(404).send(err.message);
  }
}
