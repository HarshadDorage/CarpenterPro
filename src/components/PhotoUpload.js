import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function PhotoUpload({ onUploadSuccess }) {
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    if (!session || session.user.role !== 'shopOwner') {
      setError('Only shop owners can upload photos');
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const fileName = `work_${Date.now()}_${file.name}`;
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: reader.result,
            fileName: fileName
          }),
        });

        if (!response.ok) throw new Error('Upload failed');
        
        const data = await response.json();
        onUploadSuccess(data.url);
      };
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700">
        {isUploading ? 'Uploading...' : 'Upload New Photo'}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload}
          className="hidden"
          disabled={isUploading}
        />
      </label>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      <p className="text-gray-500 text-sm mt-1">Max size: 5MB (JPG, PNG)</p>
    </div>
  );
}