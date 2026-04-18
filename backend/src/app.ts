import express from "express";
import cors from "cors";
import contactRoutes from "./routes/routes";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);

export default app;

