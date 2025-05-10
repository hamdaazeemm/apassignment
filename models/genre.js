import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
  id: String,
  name: String,
});

export default mongoose.models.Genre || mongoose.model('Genre', GenreSchema);


