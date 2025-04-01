import { useState } from 'react'

export default function MeasurementCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [thickness, setThickness] = useState('')
  const [material, setMaterial] = useState('plywood')
  const [result, setResult] = useState(null)

  const calculate = (e) => {
    e.preventDefault()
    
    const l = parseFloat(length)
    const w = parseFloat(width)
    const t = parseFloat(thickness)
    
    if (l && w && t) {
      // Basic calculations
      const area = l * w
      const volume = area * t
      const boardFeet = (l * 12 * w * 12 * t) / 144 // Convert all to inches first
      
      // Sheet material calculations
      const sheetsNeeded = Math.ceil(area / 32) // 8x4 sheets = 32 sq.ft
      const waste = (sheetsNeeded * 32 - area).toFixed(2)
      
      // Cost estimation (sample rates)
      const materialRates = {
        plywood: 50,
        mdf: 40,
        teak: 200,
        oak: 150
      }
      const materialCost = sheetsNeeded * materialRates[material]
      
      // Cutting pattern suggestions
      const cuttingPattern = generateCuttingPattern(l, w)
      
      setResult({
        area: area.toFixed(2),
        volume: volume.toFixed(2),
        boardFeet: boardFeet.toFixed(2),
        sheets: sheetsNeeded,
        waste,
        materialCost,
        cuttingPattern,
        materialType: material.charAt(0).toUpperCase() + material.slice(1)
      })
    }
  }

  // Generate optimal cutting pattern
  const generateCuttingPattern = (length, width) => {
    const patterns = []
    let remainingLength = 8
    let remainingWidth = 4
    
    // Try to fit the main piece
    if (length <= 8 && width <= 4) {
      patterns.push(`${length}ft x ${width}ft (main piece)`)
      remainingLength -= length
      remainingWidth -= width
      
      // Suggest uses for remaining material
      if (remainingLength > 0) {
        patterns.push(`${remainingLength}ft x ${width}ft (remaining length)`)
      }
      if (remainingWidth > 0) {
        patterns.push(`${length}ft x ${remainingWidth}ft (remaining width)`)
      }
    } else {
      // For pieces larger than a single sheet
      patterns.push(`Multiple sheets needed - panel construction recommended`)
    }
    
    return patterns
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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Results for {result.materialType}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Area:</span> {result.area} sq.ft
                <span className="text-sm text-gray-500 ml-2">(L×W: {length}ft × {width}ft)</span>
              </p>
              
              <p className="text-gray-700">
                <span className="font-semibold">Volume:</span> {result.volume} cu.ft
              </p>
              
              <p className="text-gray-700">
                <span className="font-semibold">Board Feet:</span> {result.boardFeet}
                <span className="text-sm text-gray-500 ml-2">(L×W×T in inches ÷ 144)</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Sheets Needed:</span> {result.sheets} (8x4 sheets)
              </p>
              
              <p className="text-gray-700">
                <span className="font-semibold">Estimated Waste:</span> {result.waste} sq.ft
                <span className="text-sm text-gray-500 ml-2">({((result.waste / (result.sheets * 32)) * 100).toFixed(1)}% of total)</span>
              </p>
              
              <p className="text-gray-700">
                <span className="font-semibold">Material Cost:</span> ₹{result.materialCost}
                <span className="text-sm text-gray-500 ml-2">(approximate)</span>
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-700 font-semibold mb-2">Suggested Cutting Pattern:</p>
            <ul className="list-disc pl-5 space-y-1">
              {result.cuttingPattern.map((pattern, index) => (
                <li key={index} className="text-gray-600">{pattern}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              Tip: Always cut largest pieces first to minimize waste
            </p>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-100">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Pro Tip:</span> For {result.materialType}, allow 5% extra for 
              mistakes and natural defects in the material.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}