import Link from 'next/link'

export default function FeatureCard({ title, description, icon, link }) {
  return (
    <Link href={link} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <h3 className="ml-3 text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mt-2 flex-grow">{description}</p>
      <div className="mt-4 text-blue-600 flex items-center">
        <span>Explore tool</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}