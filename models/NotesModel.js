const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    noteTitle: {type: String, required: true},
    noteDescription: {type: String, required: true},
    priority: {
        type: String,
        enum: ['HIGH', 'LOW', 'MEDIUM'],
        default: 'LOW'
    },
    dateAdded: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Note', NoteSchema);
