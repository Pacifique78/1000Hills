import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fileUpload from 'express-fileupload';
import userRoutes from "./routes/userRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = process.env.DATABASE_URL;
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => {
    console.log(err);
    return app.use((req, res) =>
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      })
    );
  });

app.get("/api/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "WELCOME TO 1000 Hills View Collection Backend",
  });
});

app.use("/api", userRoutes);
app.use("/api", placeRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "route not found",
  });
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
