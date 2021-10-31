// Include necessary packages
const express = require('express');
const path = require('path');
const allNotes = require('./db/db.json');

const app = express();
const PORT = 3001;

// middleware
app.use(express.static('public'));
app.use(express.json());

// Create path to notes app
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Return saved notes as JSON file
app.get('/api/notes', (req, res) => {
    return res.json(allNotes);
});

// Route all other client GET requests to index.html file
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Bring server to life
app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
);
