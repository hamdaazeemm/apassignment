// pages/api/movies/[id].js
import { connectToDatabase } from '../../../lib/db';
import Movie from '../../../models/movie';
import Genre from '../../../models/genre';
import Director from '../../../models/director';

export default async function handler(req, res) {
  await connectToDatabase();

  const { id } = req.query;

  if (req.method === 'GET') {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    const genre = await Genre.findOne({ id: movie.genreId });
    const director = await Director.findOne({ id: movie.directorId });

    res.status(200).json({ movie, genre, director });
  } else {
    res.status(405).end();
  }
}
