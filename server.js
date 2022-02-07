const { application } = require('express');
const express = require('express');
const fs = require("fs")
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const { v4: uuidv4 } = require('uuid');
const {readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils')
// readFromFile, writeToFile, readAndAppend 
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
// GET request for saved notes
app.get('/api/notes', async(req, res) =>{ 
  const saveRequest = await readFromFile('./db/db.json')
  res.json(JSON.parse(saveRequest))
})
// POST request to save notes
app.post('/api/notes', async (req, res) => {const {title,text} = req.body
try {if (req.body){
  let id = uuidv4();
  const notesData = {title,text, id}
  console.log(notesData)
  const notes = await JSON.parse(fs.readFileSync('./db/db.json'))
  notes.push(notesData)
  fs.writeFileSync('./db/db.json', JSON.stringify(notes))
  res.redirect('/notes')
}

} catch (error) {
  console.log(error)
} 

})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));