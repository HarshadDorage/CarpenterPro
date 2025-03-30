import PhotoGallery from '../components/PhotoGallery';
import { getSession } from 'next-auth/react';

export default function GalleryPage() {
  return (
    <div>
      <PhotoGallery />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session }
  };
}