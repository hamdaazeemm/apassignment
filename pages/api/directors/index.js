// ========== pages/api/directors/index.js ==========
import { connectToDatabase } from '../../../lib/db';
import Director from '../../models/director';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const directors = await Director.find();
    res.status(200).json(directors);
  } else {
    res.status(405).end();
  }
}
