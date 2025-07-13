import { updateListing } from '../../../data/listings';

export default function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'POST') {
    const { status, title } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (title) updates.title = title;

    updateListing(id, updates);
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
