// ========== models/Movie.js ==========
import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  releaseYear: Number,
  rating: Number,
  genreId: String,
  directorId: String,
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);