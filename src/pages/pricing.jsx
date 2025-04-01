import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useRef } from 'react'

export default function PricingCalculator() {
  const [costs, setCosts] = useState({
    material: 0,
    labor: 0,
    overhead: 0,
    profitMargin: 30
  })
  const [quantity, setQuantity] = useState(1)
  const [discount, setDiscount] = useState(0)
  const [gstRate, setGstRate] = useState(18)
  const [result, setResult] = useState(null)
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  })

  const handleCostChange = (e) => {
    const { name, value } = e.target
    setCosts(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }))
  }

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculatePricing = (e) => {
    e.preventDefault()

    const totalCost = costs.material + costs.labor + costs.overhead
    const profitAmount = totalCost * (costs.profitMargin / 100)
    const unitPrice = totalCost + profitAmount
    const discountedPrice = unitPrice * (1 - (discount / 100))
    const subtotal = discountedPrice * quantity
    const gstAmount = subtotal * (gstRate / 100)
    const totalPrice = subtotal + gstAmount

    setResult({
      totalCost,
      profitAmount,
      unitPrice,
      discountedPrice,
      subtotal,
      gstAmount,
      totalPrice,
      profitMargin: costs.profitMargin,
      gstRate
    })
  }

  const prepareBill = () => {
    if (!customerInfo.name) {
      setShowCustomerForm(true)
    } else {
      printBill()
    }
  }

  const printBill = () => {
    const printWindow = window.open('', '', 'width=600,height=700')
    printWindow.document.write(`
      <html>
        <head>
          <title>Carpenter Bill</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
            
            body {
              font-family: 'Inter', sans-serif;
              padding: 30px;
              color: #333;
              line-height: 1.5;
            }
            
            .bill-container {
              max-width: 550px;
              margin: 0 auto;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 30px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            
            .bill-header {
              text-align: center;
              margin-bottom: 24px;
              padding-bottom: 20px;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .bill-title {
              font-size: 24px;
              font-weight: 600;
              color: #1e293b;
              margin-bottom: 4px;
            }
            
            .bill-subtitle {
              font-size: 14px;
              color: #64748b;
              margin-bottom: 12px;
            }
            
            .bill-meta {
              display: flex;
              justify-content: space-between;
              margin-bottom: 24px;
              font-size: 14px;
              color: #64748b;
            }
            
            .bill-customer {
              background: #f8fafc;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 24px;
            }
            
            .customer-title {
              font-weight: 500;
              margin-bottom: 8px;
              color: #1e293b;
            }
            
            .bill-table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              margin: 24px 0;
            }
            
            .bill-table th {
              background: #f1f5f9;
              padding: 12px 16px;
              text-align: left;
              font-weight: 500;
              color: #334155;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .bill-table td {
              padding: 12px 16px;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .bill-table tr:last-child td {
              border-bottom: none;
            }
            
            .text-right {
              text-align: right;
            }
            
            .text-bold {
              font-weight: 600;
            }
            
            .bill-total {
              margin-top: 24px;
              padding-top: 16px;
              border-top: 1px dashed #cbd5e1;
              text-align: right;
              font-size: 16px;
            }
            
            .bill-footer {
              margin-top: 32px;
              padding-top: 16px;
              border-top: 1px dashed #cbd5e1;
              text-align: center;
              font-size: 13px;
              color: #64748b;
            }
            
            .signature-area {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: right;
            }
            
            .discount-row {
              color: #dc2626;
            }
            
            .total-amount {
              font-size: 18px;
              color: #1e293b;
              margin-top: 8px;
            }
          </style>
        </head>
        <body>
          <div class="bill-container">
            <div class="bill-header">
              <div class="bill-title">Carpenter Solution</div>
              <div class="bill-subtitle">Premium Woodworking Services</div>
              <div style="font-size: 13px; color: #64748b;">
                123 Workshop Street, Carpenter Town • Phone: 9876543210<br>
                GSTIN: 22ABCDE1234F1Z5
              </div>
            </div>
            
            <div class="bill-meta">
              <div>
                <strong>Bill No:</strong> ${Math.floor(1000 + Math.random() * 9000)}<br>
                <strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div style="text-align: right;">
                ${customerInfo.phone ? `<strong>Phone:</strong> ${customerInfo.phone}<br>` : ''}
                ${customerInfo.email ? `<strong>Email:</strong> ${customerInfo.email}` : ''}
              </div>
            </div>
            
            <div class="bill-customer">
              <div class="customer-title">Customer Details</div>
              <div><strong>${customerInfo.name}</strong></div>
              ${customerInfo.address ? `<div style="margin-top: 6px;">${customerInfo.address}</div>` : ''}
            </div>
            
            <table class="bill-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th class="text-right">Qty</th>
                  <th class="text-right">Rate</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Carpentry Work</td>
                  <td class="text-right">${quantity}</td>
                  <td class="text-right">₹${result.discountedPrice.toFixed(2)}</td>
                  <td class="text-right">₹${result.subtotal.toFixed(2)}</td>
                </tr>
                ${discount > 0 ? `
                <tr class="discount-row">
                  <td colspan="3">Discount (${discount}%)</td>
                  <td class="text-right">-₹${(result.unitPrice * quantity - result.subtotal).toFixed(2)}</td>
                </tr>
                ` : ''}
                ${gstRate > 0 ? `
                <tr>
                  <td colspan="3">GST (${gstRate}%)</td>
                  <td class="text-right">₹${result.gstAmount.toFixed(2)}</td>
                </tr>
                ` : ''}
              </tbody>
            </table>
            
            <div class="bill-total">
              <div>Subtotal: ₹${result.subtotal.toFixed(2)}</div>
              ${gstRate > 0 ? `<div>GST: ₹${result.gstAmount.toFixed(2)}</div>` : ''}
              <div class="total-amount">Total Amount: ₹${result.totalPrice.toFixed(2)}</div>
              ${gstRate > 0 ? `<div style="font-size: 13px; color: #64748b;">(Inclusive of all taxes)</div>` : ''}
            </div>
            
            <div class="signature-area">
              <div style="display: inline-block; text-align: center;">
                <div style="margin-bottom: 40px;">_________________________</div>
                <div>Authorized Signature</div>
              </div>
            </div>
            
            <div class="bill-footer">
              <div>Thank you for your business!</div>
              <div style="margin-top: 6px;">Terms: Payment due upon receipt • E. & O.E.</div>
            </div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `)
    printWindow.document.close()
    setShowCustomerForm(false)
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div>
                  <label className="block text-gray-800 mb-2">GST Rate (%)</label>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="0">0% (Exempt)</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
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
                        <span className="text-gray-800">Subtotal ({quantity} units):</span>
                        <span className="font-semibold">₹{result.subtotal.toFixed(2)}</span>
                      </p>
                    )}
                    {gstRate > 0 && (
                      <p className="flex justify-between">
                        <span className="text-gray-800">GST ({gstRate}%):</span>
                        <span className="font-semibold">₹{result.gstAmount.toFixed(2)}</span>
                      </p>
                    )}
                    <p className="flex justify-between text-lg mt-2">
                      <span className="text-gray-800 font-bold">Total Amount:</span>
                      <span className="font-bold text-blue-700">₹{result.totalPrice.toFixed(2)}</span>
                    </p>
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

                <button
                  onClick={prepareBill}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-4"
                >
                  Generate Customer Bill
                </button>
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

        {/* Modern Customer Information Modal */}
        {showCustomerForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-scaleIn">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Customer Details</h3>
                <button
                  onClick={() => setShowCustomerForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); printBill(); }} className="space-y-5">
                <div className="space-y-4">
                  {/* Name Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleCustomerInfoChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="John Doe"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      rows={3}
                      placeholder="123 Main St, City"
                    ></textarea>
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleCustomerInfoChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="+91 9876543210"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleCustomerInfoChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="john@example.com"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomerForm(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-medium shadow-sm"
                  >
                    Generate Bill
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}