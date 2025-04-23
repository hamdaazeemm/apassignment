import { getAllDirectors } from '../../utils/data';

export default function handler(req, res) {
  res.status(200).json(getAllDirectors());
}
