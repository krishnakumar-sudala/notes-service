const client = require("./redisClient");
const { v4: uuid } = require("uuid");

const NOTES_SET = "notes:all";

async function createNote({ title, content }) {
  const id = uuid();
  const note = {
    id,
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await client.set(`note:${id}`, JSON.stringify(note));
  await client.sAdd(NOTES_SET, id);

  return note;
}

async function getAllNotes() {
  const ids = await client.sMembers(NOTES_SET);
  const notes = [];

  for (const id of ids) {
    const raw = await client.get(`note:${id}`);
    if (raw) notes.push(JSON.parse(raw));
  }

  return notes;
}

async function getNote(id) {
  const raw = await client.get(`note:${id}`);
  return raw ? JSON.parse(raw) : null;
}

async function updateNote(id, { title, content }) {
  const existing = await getNote(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    title: title ?? existing.title,
    content: content ?? existing.content,
    updatedAt: new Date().toISOString()
  };

  await client.set(`note:${id}`, JSON.stringify(updated));
  return updated;
}

async function deleteNote(id) {
  await client.del(`note:${id}`);
  await client.sRem(NOTES_SET, id);
}

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote
};
