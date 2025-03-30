import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box, Text } from '@react-three/drei'
import { useRef, useState } from 'react'

export default function FurniturePreview({ dimensions, color, material, furnitureType }) {
  const boxRef = useRef()
  const [controlsEnabled, setControlsEnabled] = useState(true)

  // Convert feet to smaller units for better 3D visualization
  const scaleFactor = 0.3
  const scaledDimensions = {
    width: dimensions.width * scaleFactor,
    height: dimensions.height * scaleFactor,
    length: dimensions.length * scaleFactor
  }

  return (
    <div className="relative h-full">
      <Canvas 
        className="w-full h-full"
        camera={{ position: [5, 5, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <group ref={boxRef} position={[0, scaledDimensions.height/2, 0]}>
          <Box 
            args={[scaledDimensions.width, scaledDimensions.height, scaledDimensions.length]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial 
              color={color} 
              roughness={material === 'metal' ? 0.1 : 0.7}
              metalness={material === 'metal' ? 0.9 : 0.1}
            />
          </Box>
        </group>
        
        <gridHelper args={[10, 10]} />
        <OrbitControls 
          enabled={controlsEnabled}
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={1}
          maxDistance={20}
        />
        
        {/* 3D Text Label */}
        <Text
          position={[0, scaledDimensions.height + 0.5, 0]}
          fontSize={0.5}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {furnitureType}
        </Text>
      </Canvas>

      {/* Control buttons */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button 
          onClick={() => setControlsEnabled(!controlsEnabled)}
          className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 px-3 py-1 rounded-md shadow"
        >
          {controlsEnabled ? 'Lock View' : 'Unlock View'}
        </button>
        <button 
          onClick={() => boxRef.current.rotation.set(0, 0, 0)}
          className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 px-3 py-1 rounded-md shadow"
        >
          Reset View
        </button>
      </div>

      {/* Overlay info */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="inline-block bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
          <p className="text-lg font-semibold">{furnitureType} Preview</p>
          <p>Dimensions: {dimensions.length}ft × {dimensions.width}ft × {dimensions.height}ft</p>
          <p>Material: {material}</p>
          <p>Color: <span className="inline-block w-4 h-4 rounded-full border border-white" style={{ backgroundColor: color }} /></p>
        </div>
      </div>
    </div>
  )
}