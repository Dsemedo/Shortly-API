import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

import signupRouter from "./routes/signupRouter.js";
import signinRouter from "./routes/signinRouter.js";
import urlRouter from "./routes/urlRouter.js";
import userRouter from "./routes/usersRouter.js";
import rankingRouter from "./routes/rankingRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(signupRouter);
app.use(signinRouter);
app.use(urlRouter);
app.use(userRouter);
app.use(rankingRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on ${port}`));
