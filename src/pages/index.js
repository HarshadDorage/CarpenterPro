import Head from 'next/head'
import Header from '../components/Header'
import FeatureCard from '../components/FeatureCard'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isListening, setIsListening] = useState(false)
  const [voiceCommand, setVoiceCommand] = useState('')
  
  const features = [
    {
      title: "Measurement & Cutting",
      description: "Precise calculators for accurate measurements and optimal cutting patterns",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
        </svg>
      ),
      link: "/calculators"
    },
    {
      title: "Material & Cost",
      description: "Estimate material requirements and calculate exact costs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: "/calculators"
    },
    {
      title: "3D Design Preview",
      description: "Visualize your furniture before building",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      link: "/design"
    },
    {
      title: "Profit Calculation",
      description: "Calculate pricing and profit margins accurately",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
        </svg>
      ),
      link: "/pricing"
    }
  ]

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Try Chrome or Edge.")
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
      setVoiceCommand('Listening...')
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setVoiceCommand(transcript)
      processVoiceCommand(transcript)
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error)
      setIsListening(false)
      setVoiceCommand(`Error: ${event.error}`)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const processVoiceCommand = (command) => {
    const normalizedCommand = command.toLowerCase()
    
    if (normalizedCommand.includes('measure') || normalizedCommand.includes('cutting')) {
      window.location.href = '/calculators'
    } else if (normalizedCommand.includes('cost') || normalizedCommand.includes('material')) {
      window.location.href = '/calculators'
    } else if (normalizedCommand.includes('design') || normalizedCommand.includes('3d')) {
      window.location.href = '/design'
    } else if (normalizedCommand.includes('profit') || normalizedCommand.includes('price')) {
      window.location.href = '/pricing'
    } else if (normalizedCommand.includes('calculate')) {
      // You can add specific calculation commands here
      alert(`Voice command received: ${command}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Furniture Carpenter Solution</title>
        <meta name="description" content="Tools for carpenters to calculate measurements, costs, and design furniture" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Furniture Carpenter Solution</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All-in-one tools for carpenters to solve measurement, cutting, cost and design problems
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
            />
          ))}
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Voice Command Available</h2>
          <p className="text-gray-600 mb-4">
            Use voice input for hands-free calculations. Just say "Calculate" followed by your measurement.
          </p>
          <button 
            onClick={handleVoiceInput}
            className={`px-4 py-2 rounded-lg flex items-center ${isListening ? 'bg-red-600' : 'bg-blue-600'} text-white`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {isListening ? 'Listening...' : 'Start Voice Input'}
          </button>
          {voiceCommand && (
            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <p className="text-gray-800">Command: <span className="font-semibold">{voiceCommand}</span></p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}