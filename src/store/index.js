import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#1a1a1a",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./nft.jpeg",
  fullDecal: "./threejs.png",
});

export default state;
