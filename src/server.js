import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

import signupRouter from "./routes/signupRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(signupRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on ${port}`));
