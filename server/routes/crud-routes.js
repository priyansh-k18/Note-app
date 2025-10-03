import express from 'express';
import { addNote, allNotes, deleteById, getNoteById, updateById } from '../controllers/crud.js';

const Router = express.Router();

Router.post('/newNote', addNote);
Router.get('/', allNotes);
Router.get('/:id', getNoteById);
Router.put('/:id', updateById);
Router.delete('/:id', deleteById);

export default Router;
