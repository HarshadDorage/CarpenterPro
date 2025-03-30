import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PortfolioManager() {
  const { data: session, status } = useSession();
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch portfolio images
  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle file upload
  const handleUpload = async (e) => {
    if (status !== 'authenticated' || session.user.role !== 'shopOwner') {
      setError('Unauthorized access');
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
        const uploadRes = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Data: reader.result,
            fileName: `portfolio_${Date.now()}_${file.name}`
          }),
        });

        if (!uploadRes.ok) throw new Error('Upload failed');
        await fetchPortfolio();
      };
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPortfolio();
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Our Work Portfolio</h2>
      
      {status === 'authenticated' && session.user.role === 'shopOwner' && (
        <div className="mb-6">
          <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
            {isUploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : 'Upload New Photo'}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      {error && status !== 'authenticated' && (
        <p className="text-red-500 mb-4">Please login to view portfolio</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md">
              <Image
                src={img.url}
                alt={`Portfolio item ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">
            No portfolio items yet. {session?.user?.role === 'shopOwner' && 'Upload some photos to showcase your work!'}
          </p>
        )}
      </div>
    </div>
  );
}