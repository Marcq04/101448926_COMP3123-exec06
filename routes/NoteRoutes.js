const express = require('express');
const router = express.Router();
const NoteController = require('../controller/NoteController');

// Create a new note
router.post('/', NoteController.create);

// Retrieve all notes
router.get('/', NoteController.findAll);

// Retrieve a single note with noteId
router.get('/:noteId', NoteController.findOne);

// Update a note with noteId
router.put('/:noteId', NoteController.update);

// Delete a note with noteId
router.delete('/:noteId', NoteController.delete);

module.exports = router;
