// components/PhotoGallery.js
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PhotoGallery() {
  const { data: session } = useSession();
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch photos from API
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const res = await fetch('/api/photos');
        const data = await res.json();
        setPhotos(data);
      } catch (error) {
        console.error("Failed to load photos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPhotos();
  }, []);

  // Handle new photo upload
  const handleNewPhoto = async (e) => {
    if (!session?.user?.role === 'shopOwner') return;
    
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const newPhoto = await res.json();
      setPhotos([newPhoto, ...photos]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  if (isLoading) {
    return <div>Loading gallery...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Our Work Gallery</h2>
        
        {/* SHOP OWNER UPLOAD BUTTON */}
        {session?.user?.role === 'shopOwner' && (
          <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            Add Photos
            <input 
              type="file" 
              accept="image/*"
              onChange={handleNewPhoto}
              className="hidden"
            />
          </label>
        )}
      </div>

      {photos.length === 0 ? (
        <p className="text-center py-8 text-gray-500">
          No photos available yet.
          {!session && " Shop owners can login to add photos."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={photo.url}
                alt={`Gallery item ${index}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}