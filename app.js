const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notesRoutes = require("./routes/notes");

const app = express();
app.use(express.json());
app.use(logger);

app.get("/health", (req, res) => res.send("OK"));
app.use("/notes", notesRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Notes API running on port 3000"));
