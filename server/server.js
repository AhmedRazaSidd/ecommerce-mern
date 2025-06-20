import express from "express";
import dotenv from "dotenv/config";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
  connectDB();
});
