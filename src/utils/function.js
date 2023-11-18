import axios from "axios";
import Moralis from "moralis";

const Auth = Buffer.from(
  process.env.API_KEY + ":" + process.env.API_KEY_SECRET
).toString("base64");

const chainId = 1;

export const fetchMyNFTs = async (address) => {
  // try {
  //   const { data } = await axios.get(
  //     `https://nft.api.infura.io/networks/${chainId}/accounts/${walletAddress}/assets/nfts`,
  //     {
  //       headers: {
  //         Authorization: `Basic ${Auth}`,
  //       },
  //     }
  //   );
  //   // console.log("result:", data);
  //   return data.assets.filter((item) => item.metadata);
  // } catch (error) {
  //   // console.log("error:", error);
  //   return error;
  // }
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNiMzliZTNkLTMwYjEtNDc1OC1iZjBhLWQ2MTM3YjllNWUyYSIsIm9yZ0lkIjoiMzY0NDczIiwidXNlcklkIjoiMzc0NTg1IiwidHlwZUlkIjoiZGJhNGUxODgtYTAzMi00MGFhLWI4MDUtYjE2ZWU2OWU0NmQzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDAwMDUzMDQsImV4cCI6NDg1NTc2NTMwNH0.OlLVKR1kslOWHy1eiXXdrDkhVpkzqpyxzUI8mTdmp0E",
      });
    }

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: "0x1",
      format: "decimal",
      mediaItems: false,
      address,
    });
    console.log(response.raw);
    return response?.raw?.result
      .filter((item) => item?.metadata)
      .map((item) => ({ ...item, metadata: JSON.parse(item?.metadata) }));
  } catch (e) {
    console.log("error moralis", e);
  }
};

export const replaceIpfsOrigin = (url) =>
  url?.replace("ipfs://", "https://ipfs.io/ipfs/");
