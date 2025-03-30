import { useState } from 'react'

export default function AngleCalculator() {
  const [angle, setAngle] = useState('45')
  const [length, setLength] = useState('')
  const [result, setResult] = useState(null)

  const calculate = (e) => {
    e.preventDefault()
    
    const a = parseFloat(angle)
    const l = parseFloat(length)
    
    if (a && l) {
      const radians = a * (Math.PI / 180)
      const opposite = Math.sin(radians) * l
      const adjacent = Math.cos(radians) * l
      
      setResult({
        opposite: opposite.toFixed(2),
        adjacent: adjacent.toFixed(2),
        miterAngle: (90 - a).toFixed(2)
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Angle Cutting Calculator</h2>
      
      <form onSubmit={calculate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Angle (degrees)</label>
            <input
              type="number"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. 45"
              step="0.1"
              min="0"
              max="90"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Length (inches)</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. 10"
              step="0.01"
              required
            />
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-700">Opposite Side: <span className="font-semibold">{result.opposite} in</span></p>
            </div>
            <div>
              <p className="text-gray-700">Adjacent Side: <span className="font-semibold">{result.adjacent} in</span></p>
            </div>
            <div>
              <p className="text-gray-700">Miter Angle: <span className="font-semibold">{result.miterAngle}°</span></p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">Cutting Instructions:</p>
            <p className="text-gray-600">1. Set your miter saw to {result.miterAngle}°</p>
            <p className="text-gray-600">2. Measure and mark {length} inches on the board</p>
            <p className="text-gray-600">3. Cut along the marked line</p>
          </div>
        </div>
      )}
    </div>
  )
}