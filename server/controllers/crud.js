import { Note } from '../models/Notes.js';

export const addNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = await Note.create({
      title,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'New note added successfully',
      data: newNote,
    });
  } catch (e) {
    console.error(e); // good for debugging
    return res.status(500).json({
      success: false,
      message: 'Internal error occurred! Please try again',
    });
  }
};
export const allNotes = async (req, res) => {
  try {
    const allNote = await Note.find();
    res.status(200).json(allNote);
  } catch (e) {
    console.error(e); // good for debugging
    return res.status(500).json({
      success: false,
      message: 'Internal error occurred! Please try again',
    });
  }
};
export const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    res.status(200).json(note);
  } catch (e) {
    console.error(e); // good for debugging
    return res.status(500).json({
      success: false,
      message: 'Internal error occurred! Please try again',
    });
  }
};
export const updateById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(noteId, { title, description }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }
    res.status(201).json(updatedNote);
  } catch (e) {
    console.error(e); // good for debugging
    return res.status(500).json({
      success: false,
      message: 'Internal error occurred! Please try again',
    });
  }
};
export const deleteById = async (req, res) => {
  try {
    const noteId = req.params.id;

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: deletedNote, // optional: return deleted note for frontend confirmation
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: 'Internal error occurred! Please try again',
    });
  }
};
