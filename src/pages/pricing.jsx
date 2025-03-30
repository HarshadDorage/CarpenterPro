import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function PricingCalculator() {
  const [costs, setCosts] = useState({
    material: 0,
    labor: 0,
    overhead: 0,
    profitMargin: 30
  })
  const [quantity, setQuantity] = useState(1)
  const [discount, setDiscount] = useState(0)
  const [result, setResult] = useState(null)

  const handleCostChange = (e) => {
    const { name, value } = e.target
    setCosts(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }))
  }

  const calculatePricing = (e) => {
    e.preventDefault()
    
    const totalCost = costs.material + costs.labor + costs.overhead
    const profitAmount = totalCost * (costs.profitMargin / 100)
    const unitPrice = totalCost + profitAmount
    const discountedPrice = unitPrice * (1 - (discount / 100))
    const totalPrice = discountedPrice * quantity
    
    setResult({
      totalCost,
      profitAmount,
      unitPrice,
      discountedPrice,
      totalPrice,
      profitMargin: costs.profitMargin
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Pricing Calculator - Carpenter Solution</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Pricing & Profit Calculator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Costs</h2>
            
            <form onSubmit={calculatePricing} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 mb-2">Material Cost (₹)</label>
                  <input
                    type="number"
                    name="material"
                    value={costs.material}
                    onChange={handleCostChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 mb-2">Labor Cost (₹)</label>
                  <input
                    type="number"
                    name="labor"
                    value={costs.labor}
                    onChange={handleCostChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 mb-2">Overhead Costs (₹)</label>
                <input
                  type="number"
                  name="overhead"
                  value={costs.overhead}
                  onChange={handleCostChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-2">Profit Margin (%)</label>
                <input
                  type="number"
                  name="profitMargin"
                  value={costs.profitMargin}
                  onChange={handleCostChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 mb-2">Discount (%)</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Calculate Pricing
              </button>
            </form>
          </div>

          {/* Results Display */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pricing Results</h2>
            
            {result ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Cost Breakdown</h3>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-800">Material Cost:</span>
                      <span className="font-semibold">₹{result.totalCost.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-800">Profit ({result.profitMargin}%):</span>
                      <span className="font-semibold">₹{result.profitAmount.toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Pricing</h3>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-800">Unit Price:</span>
                      <span className="font-semibold">₹{result.unitPrice.toFixed(2)}</span>
                    </p>
                    {discount > 0 && (
                      <p className="flex justify-between">
                        <span className="text-gray-800">After Discount ({discount}%):</span>
                        <span className="font-semibold">₹{result.discountedPrice.toFixed(2)}</span>
                      </p>
                    )}
                    {quantity > 1 && (
                      <p className="flex justify-between">
                        <span className="text-gray-800">Total ({quantity} units):</span>
                        <span className="font-semibold">₹{result.totalPrice.toFixed(2)}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Profit Analysis</h3>
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      At this price, you'll earn <span className="font-semibold">₹{result.profitAmount.toFixed(2)}</span> per unit.
                    </p>
                    {quantity > 1 && (
                      <p className="text-gray-800">
                        Total profit for {quantity} units: <span className="font-semibold">₹{(result.profitAmount * quantity).toFixed(2)}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4">Enter your costs and click "Calculate Pricing" to see results</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}