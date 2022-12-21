import { connectionDb } from "../database/db.js";
import { customAlphabet } from "nanoid";

export default function postUrl(req, res){
    const {url} = req.body;

    const nanoid = customAlphabet('1234567890abcdef', 6)
    const shortUrl = nanoid()

    try{
        await connectionDb.query('INSERT INTO urls(url, "shortUrl", "userId")')
    }

}

export default function getUrl(req,res){
    const {authorization} = req.header;

    try{

    }catch(err){
        res.status(401).send(err.message)
    }
}