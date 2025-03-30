import dynamic from 'next/dynamic'

const FurniturePreview = dynamic(
  () => import('./FurniturePreview'),
  { ssr: false }
)

export default function FurniturePreviewWrapper(props) {
  return <FurniturePreview {...props} />
}