const { application } = require('express');
const express = require('express');
const fs = require("fs")
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// GET request for saved notes
app.get('/api/notes', (req, res) => 
  res.sendFile(path.join(__dirname,'./db/db.json')))

// POST request to save notes
app.post('/api/notes', async (req, res) => {
 const notes = await JSON.parse(fs.readFileSync('./db/db.json'))
 notes.push(req.body)
 fs.writeFileSync('./db/db.json', JSON.stringify(notes))
 res.redirect('/notes')
})
