
import { connectToDatabase } from '../../../lib/db';
import Movie from '../../../models/movie';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } else if (req.method === 'POST') {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } else {
    res.status(405).end();
  }
}