import axios from "axios";
import Moralis from "moralis";

const Auth = Buffer.from(
  process.env.API_KEY + ":" + process.env.API_KEY_SECRET
).toString("base64");

const chainId = 1;

export const fetchMyNFTs = async (address) => {
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
      mediaItems: true,
      address,
    });
    console.log(response.raw);
    return response?.raw?.result
      .filter((item) => item?.metadata)
      .map((item) => ({
        ...item,
        metadata: JSON.parse(item?.metadata),
        image: item?.media?.media_collection?.high?.url,
      }));
  } catch (e) {
    console.log("error moralis", e);
  }
};

export const signUpSignature = async (wallet_address) => {
  const result = await axios.post(`${process.env.API_SIGNATURE_URL}/v1/users`, {
    wallet_address,
  });
  const user = result.data?.values;
  return user;
};
export const verifySignature = async ({ wallet_address, signature }) => {
  try {
    const result = await axios.post(
      `${process.env.API_SIGNATURE_URL}/v1/users/verify`,
      {
        wallet_address,
        signature,
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};
export const verifyOwner = async ({
  wallet_address,
  token_id,
  contract_address,
}) => {
  try {
    const result = await axios.post(
      `${process.env.API_SIGNATURE_URL}/v1/users/owner`,
      { wallet_address, token_id, contract_address }
    );
    return result;
  } catch (error) {
    throw error;
  }
};
export const replaceIpfsOrigin = (url) =>
  url?.replace("ipfs://", "https://ipfs.io/ipfs/");
