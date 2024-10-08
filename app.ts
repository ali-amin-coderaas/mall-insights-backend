import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { application } from "express";
import authenticateToken from "./src/middlewares/Auth/auth.middleware";
import accountRouter from "./src/routes/account.route";
import authRouter from "./src/routes/auth.route";
import dataRouter from "./src/routes/data.route";
import shopRouter from "./src/routes/shop.route";
dotenv.config();

const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
	res.status(200).send("Hello World!");
});

app.set("view engine", "pug");
app.set("views", "./views");

// for parsing application/json
app.use(express.json());
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/auth", authRouter);

app.use("/accounts", accountRouter);

app.use("/accounts", shopRouter);

app.use("/data", dataRouter);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
