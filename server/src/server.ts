import express from "express";
import morgan from "morgan";
import path from "path"
import usersRoutes from "./routes/userRoute";
import productRoutes from "./routes/productRoute";
import orderRoutes from "./routes/orderRoute";
import { invalidPathHandler, errorResponseHandler } from "./middlewares/errorResponseHandler";
const app: express.Application = express();
const address: string = "0.0.0.0:4000";
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users",usersRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);

app.get("/", async (_req, res) => {
  res.json({ Message: "am here" });
});


// app.use(invalidPathHandler);
// app.use(errorResponseHandler);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.listen(4000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
