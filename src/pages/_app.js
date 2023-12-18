import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { mainnet } from "wagmi/chains";
import "react-toastify/dist/ReactToastify.css";

const chains = [mainnet];
const projectId = process.env.PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

import "@/styles/globals.css";
import "@/styles/main.scss";
import SEO from "@/components/seo";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ToastContainer
        position="top-right"
        hideProgressBar
        autoClose={5000}
        pauseOnHover
      />
      <SEO />
      <Component {...pageProps} />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  );
}
