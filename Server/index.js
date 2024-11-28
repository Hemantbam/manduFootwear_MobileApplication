import express from "express";
import cors from "cors";
import { authRoute } from "./src/Routes/authRoute.js";
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors()); 

app.use("/auth", authRoute);




app.listen(port);
