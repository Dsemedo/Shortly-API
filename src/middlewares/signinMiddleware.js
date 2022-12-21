import { loginSchema } from "../models/signin.js";
import dotenv from "dotenv";
dotenv.config();

export async function validSchemaSignin(req, res, next) {
  const { login } = req.body;

  const { error } = loginSchema.validate(login, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }

  next();
}

export async function validIdUser(req, res, next){
  
}
