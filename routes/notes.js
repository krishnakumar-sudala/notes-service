const express = require("express");
const router = express.Router();
const notes = require("../services/notesService");

// Create
router.post("/", async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).send("Title is required");

    const note = await notes.createNote({ title, content });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

// Read all
router.get("/", async (req, res, next) => {
  try {
    const all = await notes.getAllNotes();
    res.json(all);
  } catch (err) {
    next(err);
  }
});

// Read one
router.get("/:id", async (req, res, next) => {
  try {
    const note = await notes.getNote(req.params.id);
    if (!note) return res.status(404).send("Not found");
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// Update
router.put("/:id", async (req, res, next) => {
  try {
    const updated = await notes.updateNote(req.params.id, req.body);
    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  try {
    await notes.deleteNote(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
