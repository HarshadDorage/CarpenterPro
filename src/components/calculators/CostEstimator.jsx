import { useState } from 'react'

export default function CostEstimator() {
  const [material, setMaterial] = useState('plywood')
  const [quantity, setQuantity] = useState('')
  const [laborHours, setLaborHours] = useState('')
  const [result, setResult] = useState(null)

  const materialPrices = {
    plywood: 45, // per sq.ft
    mdf: 35,
    teak: 120,
    oak: 90,
    pine: 60
  }

  const laborRate = 25 // per hour

  const calculate = (e) => {
    e.preventDefault()
    
    const qty = parseFloat(quantity)
    const hours = parseFloat(laborHours)
    
    if (qty && hours) {
      const materialCost = qty * materialPrices[material]
      const laborCost = hours * laborRate
      const totalCost = materialCost + laborCost
      const suggestedPrice = totalCost * 1.3 // 30% profit margin
      
      setResult({
        materialCost: materialCost.toFixed(2),
        laborCost: laborCost.toFixed(2),
        totalCost: totalCost.toFixed(2),
        suggestedPrice: suggestedPrice.toFixed(2),
        profit: (suggestedPrice - totalCost).toFixed(2)
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Material Cost Estimator</h2>
      
      <form onSubmit={calculate} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Material Type</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="plywood">Plywood (₹45/sq.ft)</option>
            <option value="mdf">MDF (₹35/sq.ft)</option>
            <option value="teak">Teak Wood (₹120/sq.ft)</option>
            <option value="oak">Oak Wood (₹90/sq.ft)</option>
            <option value="pine">Pine Wood (₹60/sq.ft)</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Quantity (sq.ft)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. 50"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Labor Hours</label>
            <input
              type="number"
              value={laborHours}
              onChange={(e) => setLaborHours(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. 8"
              step="0.5"
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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Cost Breakdown</h3>
          <div className="space-y-2">
            <p className="text-gray-700">Material Cost: <span className="font-semibold">₹{result.materialCost}</span></p>
            <p className="text-gray-700">Labor Cost: <span className="font-semibold">₹{result.laborCost}</span></p>
            <p className="text-gray-700">Total Cost: <span className="font-semibold">₹{result.totalCost}</span></p>
            <p className="text-gray-700">Suggested Price (30% margin): <span className="font-semibold">₹{result.suggestedPrice}</span></p>
            <p className="text-gray-700">Profit: <span className="font-semibold">₹{result.profit}</span></p>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">Material Recommendation:</p>
            <p className="text-gray-600">
              {material === 'teak' || material === 'oak' 
                ? "High quality for long-lasting furniture" 
                : material === 'plywood' 
                  ? "Good balance of quality and cost" 
                  : material === 'mdf' 
                    ? "Best for painted furniture" 
                    : "Versatile for various applications"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}