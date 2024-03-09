import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import reminderRoutes from "./routes/reminder.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js"
import petRoutes from "./routes/pet.routes.js"

import conn from "./db/conn.js";

const __dirname = path.resolve();


dotenv.config();

const port = process.env.PORT || 3001;
const app = express();


app.use(express.json()); // Parse incoming request to JSON
app.use(cookieParser()); // Access cookies

app.use("/api/auth", authRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/appointment",appointmentRoutes);
app.use("/api/pet", petRoutes);

app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  conn();
});

export default app;
