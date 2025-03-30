import { useState } from 'react'

export default function MeasurementCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [thickness, setThickness] = useState('')
  const [material, setMaterial] = useState('plywood')
  const [result, setResult] = useState(null)

  const calculate = (e) => {
    e.preventDefault()
    
    // Simple calculation logic - in a real app this would be more complex
    const l = parseFloat(length)
    const w = parseFloat(width)
    const t = parseFloat(thickness)
    
    if (l && w && t) {
      const area = l * w
      const volume = area * t
      const sheetsNeeded = Math.ceil(area / (8 * 4)) // Assuming standard 8x4 sheets
      
      setResult({
        area: area.toFixed(2),
        volume: volume.toFixed(2),
        sheets: sheetsNeeded,
        waste: (sheetsNeeded * 32 - area).toFixed(2) // 32 is 8x4
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Measurement & Cutting Calculator</h2>
      
      <form onSubmit={calculate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Length (ft)</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md "
              placeholder="e.g. 6"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Width (ft)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. 3"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Thickness (in)</label>
            <input
              type="number"
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. 0.75"
              step="0.01"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Material Type</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="plywood">Plywood</option>
            <option value="mdf">MDF</option>
            <option value="teak">Teak Wood</option>
            <option value="oak">Oak Wood</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Calculate
        </button>
      </form>
      
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700">Area: <span className="font-semibold">{result.area} sq.ft</span></p>
              <p className="text-gray-700">Volume: <span className="font-semibold">{result.volume} cu.ft</span></p>
            </div>
            <div>
              <p className="text-gray-700">Sheets Needed: <span className="font-semibold">{result.sheets} (8x4 sheets)</span></p>
              <p className="text-gray-700">Estimated Waste: <span className="font-semibold">{result.waste} sq.ft</span></p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">Optimal Cutting Pattern:</p>
            <p className="text-gray-600">Cut 1: 6ft x 3ft (main piece)</p>
            <p className="text-gray-600">Cut 2: 2ft x 4ft (from remaining)</p>
            <p className="text-gray-600">Cut 3: 6ft x 1ft (from remaining)</p>
          </div>
        </div>
      )}
    </div>
  )
}