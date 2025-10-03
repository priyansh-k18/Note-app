import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});

export const Note = mongoose.model('Note', NoteSchema);
