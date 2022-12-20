import joi from "joi";
import jwt from "jsonwebtoken";

const loginSchema = joi.object({
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

export { generateToken, loginSchema };
