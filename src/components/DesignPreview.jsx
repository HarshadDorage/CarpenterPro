// components/DesignPreview.js
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import { useRef } from 'react'

export default function FurniturePreview({ dimensions, color, material, furnitureType }) {
  const boxRef = useRef()
  const scaleFactor = 0.3 // 1 foot = 0.3 units in 3D space

  // Scale dimensions for 3D view
  const scaledDimensions = {
    width: dimensions.width * scaleFactor,
    height: dimensions.height * scaleFactor,
    length: dimensions.length * scaleFactor
  }

  return (
    <div className="relative h-full">
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <group ref={boxRef} position={[0, scaledDimensions.height/2, 0]}>
          <Box args={[scaledDimensions.width, scaledDimensions.height, scaledDimensions.length]}>
            <meshStandardMaterial 
              color={color} 
              roughness={material === 'metal' ? 0.1 : 0.7}
              metalness={material === 'metal' ? 0.9 : 0.1}
            />
          </Box>
        </group>
        
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>

      {/* Overlay with actual dimensions */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="inline-block bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
          <p className="text-lg font-semibold">{furnitureType} Preview</p>
          <p>Actual Dimensions: {dimensions.length}ft × {dimensions.width}ft × {dimensions.height}ft</p>
          <p>3D View Scale: 1ft = {(1/scaleFactor).toFixed(1)} units</p>
          <p>Material: {material}</p>
        </div>
      </div>
    </div>
  )
}