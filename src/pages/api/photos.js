// pages/api/photos.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  
  if (!fs.existsSync(uploadDir)) {
    return res.json([]);
  }

  const files = fs.readdirSync(uploadDir)
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map(file => ({
      url: `/uploads/${file}`,
      name: file
    }));

  res.status(200).json(files);
}