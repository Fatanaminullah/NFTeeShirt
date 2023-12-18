import CanvasModel from "@/components/canvas";
import HomeIntro from "@/components/home-intro";
import HomeNFT from "@/components/home-nft";
import { useCallback, useRef } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  const canvasRef = useRef();
  return (
    <div className="home">
      <Particles
        id="tsparticles"
        url="/particlesjs-config.json"
        init={particlesInit}
        loaded={particlesLoaded}
        style={{ position: "absolute !important", zIndex: 0 }}
      />
      <CanvasModel ref={canvasRef} />
      <HomeIntro />
      <HomeNFT canvasRef={canvasRef} />
    </div>
  );
}
