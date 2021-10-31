// Include necessary packages
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// middleware
app.use(express.static('public'));

// Create path
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Route everything else to index.html file
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Bring server to life
app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
);
