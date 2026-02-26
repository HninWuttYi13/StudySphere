import express from "express";
import "./config/dotenv.js";
import connectDB from "./lib/db.js";
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use("/api/auth", authRouter);
app.listen(port, () => {
  connectDB();
  console.log("server is listening on port 5000");
});
