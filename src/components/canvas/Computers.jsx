import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls,
  Preload,
  useGLTF} from "@react-three/drei";


import CanvasLoader from "../Loader";

const Computers = ({isMobile}) => {
 
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={4} groundColor="black" />
      <pointLight intensity={3} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? .7 : .70}
        position={isMobile ? [0, -3, -2.2] :[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {

   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
     const mediaQuery = window.matchMedia("(max-width:625px)");

     setIsMobile(mediaQuery.matches);

     const handleMediaQueryChange = (event) => {
       setIsMobile(event.matches);
     };

     mediaQuery.addEventListener("change", handleMediaQueryChange);

     return () => {
       mediaQuery.addEventListener("change", handleMediaQueryChange);
     };
   }, []);
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 35 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense
        fallback={
          <CanvasLoader />
        }
      >
        {" "}
        {/* Wrap fallback content in Html */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
