import { connectToDatabase } from '../../../../lib/db';
import Movie from '../../../../models/movie';

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    const movies = await Movie.find({ genreId: id });
    res.status(200).json(movies);
  } else {
    res.status(405).end();
  }
}
