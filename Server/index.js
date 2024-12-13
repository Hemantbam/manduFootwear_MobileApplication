import express from "express";
import cors from "cors";
import { authRoute } from "./src/Routes/authRoute.js";
import { shoesRoute } from "./src/Routes/shoesRoute.js";
import { orderRoute } from "./src/Routes/orderRoute.js";
import { userRoute } from "./src/Routes/userRoute.js";
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/shoes", shoesRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

app.listen(port);
