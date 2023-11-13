import "dotenv/config";
import Express from "express";
import { fileURLToPath } from "url";
import path from "path";
import rootRoute from "./routes/root.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";

const app = Express();
const PORT = process.env.PORT ?? 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(Express.json());

app.use(cookieParser());

app.use(cors(corsOptions));

// solução para usar __dirname em um escopo de ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/", Express.static(path.join(__dirname, "public")));

app.use("/", rootRoute);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    mongoErrLog.log
  );
});
