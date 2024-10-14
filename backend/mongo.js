const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@atlascluster.beu3t.mongodb.net/noteApp?retryWrites=true&w=majority&appName=AtlasCluster`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Fetching objects from the database',
    important: false,
})

note.save().then(result => {
    console.log('note saved!');
    //mongoose.connection.close();
})

Note.find({  }).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })