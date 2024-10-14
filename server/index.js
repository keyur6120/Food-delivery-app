import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import FoodRoutes from "./routes/Food.js";
import MakeRestro from "./routes/Restaurant.js";
import cookieParser from "cookie-parser";
import Category from "./routes/Category.js";
import localtunnel from "localtunnel";

const app = express();
app.use(cookieParser());
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

// CORS middleware setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the incoming origin is in the allowed origins
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the request
      }
    },
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/user", UserRoutes);
app.use("/food", FoodRoutes);
app.use("/Restro", MakeRestro);
app.use("/category", Category);

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

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DB_STRING)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
    // const tunnel = await localtunnel({ port: 8080, subdomain: 'foodapp' });
    // console.log('Tunnel URL:', tunnel.url);
  } catch (error) {
    console.log(error);
  }
};

startServer();
