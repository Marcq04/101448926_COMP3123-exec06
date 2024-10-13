const noteModel = require('../models/NotesModel');

// Create a new note
exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    const note = new noteModel({
        noteTitle: req.body.noteTitle || "Untitled Note",
        noteDescription: req.body.content,
        priority: req.body.priority,
        dateAdded: Date.now()
    });

    note.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the note."
        });
    });
};

// Retrieve all notes
exports.findAll = (req, res) => {
    noteModel.find().then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Retrieve a single note by ID
exports.findOne = (req, res) => {
    noteModel.findById(req.params.noteId).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note by ID
exports.update = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    noteModel.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle || "Untitled Note",
        noteDescription: req.body.content,
        priority: req.body.priority,
        dateUpdated: Date.now()
    }, { new: true }).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note by ID
exports.delete = (req, res) => {
    noteModel.findByIdAndRemove(req.params.noteId).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({ message: "Note deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error deleting note with id " + req.params.noteId
        });
    });
};
