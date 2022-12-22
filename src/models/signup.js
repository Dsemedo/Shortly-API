import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: joi.ref("password"),
});
