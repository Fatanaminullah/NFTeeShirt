import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

function CanvasModel({ ref }) {
  return (
    <Canvas
      ref={ref}
      id="shirt-display"
      className="canvas-model-wrapper w-full max-w-full h-full transition-all ease-in"
      shadows
      camera={{ position: [0, 0, 0], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
}

export default CanvasModel;
