import axios from "axios";

const Auth = Buffer.from(
  process.env.API_KEY + ":" + process.env.API_KEY_SECRET
).toString("base64");

const chainId = 1;

export const fetchMyNFTs = async (walletAddress) => {
  try {
    const { data } = await axios.get(
      `https://nft.api.infura.io/networks/${chainId}/accounts/${walletAddress}/assets/nfts`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      }
    );
    console.log("result:", data);
  } catch (error) {
    console.log("error:", error);
  }
};
