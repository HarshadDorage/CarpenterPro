import { useState } from 'react'

export default function HardwareSuggestor() {
  const [furnitureType, setFurnitureType] = useState('cabinet')
  const [weight, setWeight] = useState('medium')
  const [result, setResult] = useState(null)

  const hardwareSuggestions = {
    cabinet: {
      light: {
        hinges: '35mm concealed hinges (2 per door)',
        screws: '1.5 inch wood screws',
        handles: 'Standard cabinet knobs',
        brackets: 'No brackets needed'
      },
      medium: {
        hinges: 'Heavy-duty 40mm concealed hinges (3 per door)',
        screws: '2 inch wood screws',
        handles: 'Durable cabinet pulls',
        brackets: 'L-brackets for shelves'
      },
      heavy: {
        hinges: 'Industrial 45mm hinges with soft-close (4 per door)',
        screws: '2.5 inch wood screws',
        handles: 'Reinforced metal handles',
        brackets: 'Heavy-duty corner brackets'
      }
    },
    chair: {
      light: {
        hinges: 'No hinges needed',
        screws: '1 inch wood screws',
        handles: 'No handles needed',
        brackets: 'Small corner braces'
      },
      medium: {
        hinges: 'No hinges needed',
        screws: '1.5 inch wood screws',
        handles: 'No handles needed',
        brackets: 'Reinforced corner braces'
      },
      heavy: {
        hinges: 'No hinges needed',
        screws: '2 inch wood screws + wood glue',
        handles: 'No handles needed',
        brackets: 'Metal reinforcement plates'
      }
    },
    table: {
      light: {
        hinges: 'No hinges needed',
        screws: '1.5 inch wood screws',
        handles: 'No handles needed',
        brackets: 'Tabletop fasteners'
      },
      medium: {
        hinges: 'No hinges needed',
        screws: '2 inch wood screws',
        handles: 'No handles needed',
        brackets: 'Heavy-duty table connectors'
      },
      heavy: {
        hinges: 'No hinges needed',
        screws: '2.5 inch wood screws + wood glue',
        handles: 'No handles needed',
        brackets: 'Steel table reinforcement kits'
      }
    }
  }

  const calculate = (e) => {
    e.preventDefault()
    setResult(hardwareSuggestions[furnitureType][weight])
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hardware Suggestion Tool</h2>
      
      <form onSubmit={calculate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Furniture Type</label>
            <select
              value={furnitureType}
              onChange={(e) => setFurnitureType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="cabinet">Cabinet</option>
              <option value="chair">Chair</option>
              <option value="table">Table</option>
              <option value="bed">Bed</option>
              <option value="shelf">Shelf</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Weight Category</label>
            <select
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="light">Light (under 10kg)</option>
              <option value="medium">Medium (10-30kg)</option>
              <option value="heavy">Heavy (30kg+)</option>
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Get Suggestions
        </button>
      </form>
      
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommended Hardware</h3>
          <div className="space-y-2">
            <p className="text-gray-700"><span className="font-semibold">Hinges:</span> {result.hinges}</p>
            <p className="text-gray-700"><span className="font-semibold">Screws:</span> {result.screws}</p>
            <p className="text-gray-700"><span className="font-semibold">Handles:</span> {result.handles}</p>
            <p className="text-gray-700"><span className="font-semibold">Brackets:</span> {result.brackets}</p>
          </div>
        </div>
      )}
    </div>
  )
}