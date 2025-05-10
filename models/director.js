import mongoose from 'mongoose';

const DirectorSchema = new mongoose.Schema({
  id: String,
  name: String,
  biography: String,
});

export default mongoose.models.Director || mongoose.model('Director', DirectorSchema);

