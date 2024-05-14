import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import router from "./controllers/user.routes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/user", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
