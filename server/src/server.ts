import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { router as productRouter } from "./controllers/product.routes";
import { router as categoryRouter } from "./controllers/category.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}/api-docs`);
});
