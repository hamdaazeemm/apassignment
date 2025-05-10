
// ========== pages/api/directors/[id].js ==========
import { connectToDatabase } from '../../../lib/db';
import Director from '../../../models/director';
import Movie from '../../../models/movie';

export default async function handler(req, res) {
  await connectToDatabase();

  const { id } = req.query;

  if (req.method === 'GET') {
    const director = await Director.findOne({ id });
    if (!director) return res.status(404).json({ error: 'Director not found' });

    const movies = await Movie.find({ directorId: id });
    res.status(200).json({ director, movies });
  } else {
    res.status(405).end();
  }
}