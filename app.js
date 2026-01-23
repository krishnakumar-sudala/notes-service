const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notesRoutes = require("./routes/notes");
const cors = require("cors");

const app = express();   // <-- MUST come first

// CORS must be applied after app is created
app.use(cors({
  origin: "http://localhost:8082"
}));

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(logger);

app.get("/health", (req, res) => res.send("OK"));
app.use("/notes", notesRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Notes API running on port 3000"));
