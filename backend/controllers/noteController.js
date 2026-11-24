import mongoose from "mongoose";
import Note from "../models/Note.js";

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// GET /api/notes?search=word&sort=newest|oldest
export const getNotes = async (req, res) => {
  try {
    const { search, sort } = req.query;

    const filter = { user: req.user._id };

    if (search && search.trim() !== "") {
      const regex = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ title: regex }, { content: regex }];
    }

    const sortOrder = sort === "oldest" ? 1 : -1;
    const notes = await Note.find(filter).sort({ createdAt: sortOrder });

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/notes/:id
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const note = await Note.findOne({ _id: id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/notes
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Please provide title and content" });
    }

    const note = await Note.create({ user: req.user._id, title, content });

    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/notes/:id
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    if (!title || !content) {
      return res.status(400).json({ message: "Please provide title and content" });
    }

    const note = await Note.findOne({ _id: id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = title;
    note.content = content;

    const updatedNote = await note.save();

    return res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/notes/:id
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const note = await Note.findOne({ _id: id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();

    return res.status(200).json({ message: "Note deleted successfully", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
