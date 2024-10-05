import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import FoodRoutes from "./routes/Food.js";
import MakeRestro from './routes/Restaurant.js'
import cookieParser from "cookie-parser";
import Category from './routes/Category.js'
dotenv.config();

const app = express();
app.use(cookieParser())
app.use(cors({
  origin : "http://localhost:3000",
  credentials: true,
  allowedHeaders : ['Authorization', 'Content-Type']
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/user/", UserRoutes);
app.use("/food/", FoodRoutes);
app.use("/Restro",MakeRestro)
app.use("/category",Category)

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DB_STRING)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
