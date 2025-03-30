import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import PortfolioManager from '../components/PortfolioManager';


// Dynamic import for better performance (3D components are heavy)
const FurniturePreview = dynamic(
  () => import('../components/DesignPreview'),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full">Loading 3D Preview...</div>
  }
)

export default function DesignPage() {
  const [furnitureType, setFurnitureType] = useState('cabinet')
  const [dimensions, setDimensions] = useState({
    length: 6,
    width: 2,
    height: 3
  })
  const [color, setColor] = useState('#8B4513')
  const [material, setMaterial] = useState('wood')
  const [isDragging, setIsDragging] = useState(false)

  // Real-time updates with debounce for performance
  useEffect(() => {
    // Any side effects can be added here if needed
  }, [dimensions, color, material, furnitureType])

  const handleDimensionChange = (e) => {
    const { name, value } = e.target
    const numValue = parseFloat(value) || 0.1 // Minimum 0.1
    setDimensions(prev => ({
      ...prev,
      [name]: Math.max(0.1, numValue) // Ensure never goes below 0.1
    }))
  }

  const handleColorChange = (e) => {
    setColor(e.target.value)
  }

  const furniturePresets = {
    cabinet: { length: 6, width: 2, height: 3 },
    table: { length: 5, width: 3, height: 2.5 },
    chair: { length: 1.5, width: 1.5, height: 3 },
    bed: { length: 6.5, width: 5, height: 1.5 },
    shelf: { length: 4, width: 1, height: 5 }
  }

  const handlePresetChange = (type) => {
    setFurnitureType(type)
    setDimensions(furniturePresets[type])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Real-time 3D Design Preview - Carpenter Solution</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Real-time 3D Furniture Designer</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Design Controls */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Design Controls</h2>

            <div className="space-y-6">
              {/* Furniture Type Selection */}
              <div>
                <label className="block text-gray-700 mb-2">Furniture Type</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {Object.keys(furniturePresets).map((type) => (
                    <button
                      key={type}
                      onClick={() => handlePresetChange(type)}
                      className={`px-3 py-1 rounded-md text-sm capitalize transition-colors ${furnitureType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions Input */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['length', 'width', 'height'].map((dim) => (
                  <div key={dim}>
                    <label className="block text-gray-700 mb-2">
                      {dim.charAt(0).toUpperCase() + dim.slice(1)} (ft)
                    </label>
                    <input
                      type="number"
                      name={dim}
                      value={dimensions[dim]}
                      onChange={handleDimensionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white 
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      min="0.1"
                      step="0.1"
                      onMouseDown={() => setIsDragging(true)}
                      onMouseUp={() => setIsDragging(false)}
                    />
                  </div>
                ))}
              </div>

              {/* Material Selection */}
              <div>
                <label className="block text-gray-700 mb-2">Material</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  {['wood', 'plywood', 'mdf', 'metal'].map((mat) => (
                    <option key={mat} value={mat}>
                      {mat.charAt(0).toUpperCase() + mat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-gray-700 mb-2">Color</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    className="w-16 h-10 cursor-pointer border border-gray-300 rounded hover:border-blue-500 transition-all"
                  />
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Selected:</span>
                    <span
                      className="inline-block w-6 h-6 rounded border border-gray-300 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Preview Area */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Live Preview {isDragging && <span className="text-sm text-blue-600">(Updating...)</span>}
            </h2>

            <div className="border-2 border-gray-200 rounded-lg h-96 flex-1 relative">
              <FurniturePreview
                key={`${dimensions.length}-${dimensions.width}-${dimensions.height}-${color}-${material}`}
                dimensions={dimensions}
                color={color}
                material={material}
                furnitureType={furnitureType}
              />
            </div>

            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>Drag to rotate | Scroll to zoom | Right-click to pan</p>
            </div>
          </div>
        </div>
      </main>
      <section className="container mx-auto px-4 py-12">
        <PortfolioManager />
      </section>
      <Footer />
    </div>
  )
}