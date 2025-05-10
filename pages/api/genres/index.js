

import { connectToDatabase } from '../../../lib/db';
import Genre from '../../../models/genre';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } else {
    res.status(405).end();
  }
}
