// Include necessary packages
const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const uuid = require('uuid');
const allNotes = require('./db/db.json');

const app = express();
const PORT = 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create path to notes app
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Return saved notes as JSON file
app.get('/api/notes', (req, res) => {
    return res.json(allNotes);
});

// Post request to add a new note
app.post('/api/notes', (req, res) => {
    const { title, text} = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        //Obtain existing notes
        fs.readFile('/.db/reviews.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNotes);
                fs.writeFile(
                    './db/reviews.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) => 
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error');
    }
});

// Route all other client GET requests to index.html file
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Bring server to life
app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
);
