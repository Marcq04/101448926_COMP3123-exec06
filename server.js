const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const NoteRoutes = require('./routes/NoteRoutes'); // Importing the routes correctly

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://<Username>:<password>@supercluster04.qll0d.mongodb.net/comp3123_lab6?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Root route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Use the NoteRoutes for handling /notes paths
app.use('/notes', NoteRoutes);

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
