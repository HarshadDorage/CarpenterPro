import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const session = await getSession({ req });

  // Only allow authenticated shop owners
  if (!session || session.user.role !== 'shopOwner') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    // Handle file upload
    const { base64Data, fileName } = req.body;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filePath = path.join(uploadDir, fileName);

    try {
      if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(filePath, base64Data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      return res.status(200).json({ success: true, path: `/uploads/${fileName}` });
    } catch (error) {
      return res.status(500).json({ error: 'Upload failed' });
    }
  }

  if (req.method === 'GET') {
    // Return all portfolio items
    const portfolioDir = path.join(process.cwd(), 'public/uploads');
    const files = fs.readdirSync(portfolioDir).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    
    return res.status(200).json(files.map(file => ({
      url: `/uploads/${file}`,
      timestamp: fs.statSync(path.join(portfolioDir, file)).mtime
    })));
  }

  return res.status(405).end();
}