import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MeasurementCalculator from '../components/calculators/MeasurementCalculator'
import AngleCalculator from '../components/calculators/AngleCalculator'
import CostEstimator from '../components/calculators/CostEstimator'
import HardwareSuggestor from '../components/calculators/HardwareSuggestor'
import { useState } from 'react'

export default function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState('measurement')

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Calculators - Carpenter Solution</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Carpenter Calculators</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button 
            onClick={() => setActiveCalculator('measurement')}
            className={`py-3 px-4 rounded-lg ${activeCalculator === 'measurement' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            Measurement
          </button>
          <button 
            onClick={() => setActiveCalculator('angle')}
            className={`py-3 px-4 rounded-lg ${activeCalculator === 'angle' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            Angle Cutting
          </button>
          <button 
            onClick={() => setActiveCalculator('cost')}
            className={`py-3 px-4 rounded-lg ${activeCalculator === 'cost' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            Cost Estimator
          </button>
          <button 
            onClick={() => setActiveCalculator('hardware')}
            className={`py-3 px-4 rounded-lg ${activeCalculator === 'hardware' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            Hardware
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-black">
          {activeCalculator === 'measurement' && <MeasurementCalculator />}
          {activeCalculator === 'angle' && <AngleCalculator />}
          {activeCalculator === 'cost' && <CostEstimator />}
          {activeCalculator === 'hardware' && <HardwareSuggestor />}
        </div>
      </main>

      <Footer />
    </div>
  )
}