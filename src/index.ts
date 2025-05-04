import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import swiftRoutes from "./routes/swiftRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/v1", swiftRoutes);

app.get("/", (req, res) => {
  res.send("Remitly SWIFT API is running!");
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected!");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
