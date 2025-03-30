// pages/api/upload.js
import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  // Only allow shop owners
  if (!session || session.user.role !== 'shopOwner') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const formidable = require('formidable');
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json({ error: err.message });

      const oldPath = files.image.filepath;
      const newPath = path.join(uploadDir, files.image.originalFilename);
      
      fs.renameSync(oldPath, newPath);
      
      return res.json({ 
        url: `/uploads/${files.image.originalFilename}` 
      });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}