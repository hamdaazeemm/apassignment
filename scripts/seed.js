const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://l215227:yVNd90C3cLH1NfzV@cluster0.r3ppp3b.mongodb.net/moviehouse?retryWrites=true&w=majority';

// Load the JSON manually
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/movies.json'), 'utf-8')
);

// Define Schemas
const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  releaseYear: Number,
  rating: Number,
  genreId: String,
  directorId: String,
});
const GenreSchema = new mongoose.Schema({ id: String, name: String });
const DirectorSchema = new mongoose.Schema({
  id: String,
  name: String,
  biography: String,
});

const Movie = mongoose.model('Movie', MovieSchema);
const Genre = mongoose.model('Genre', GenreSchema);
const Director = mongoose.model('Director', DirectorSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    await Movie.deleteMany({});
    await Genre.deleteMany({});
    await Director.deleteMany({});

    await Movie.insertMany(data.movies);
    await Genre.insertMany(data.genres);
    await Director.insertMany(data.directors);

    console.log('🎉 Data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
}

seed();
