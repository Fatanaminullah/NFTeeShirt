import { AnimatePresence, motion } from "framer-motion";
import state from "../store";
import { useAccount, useSignMessage } from "wagmi";
import { Web3Button } from "@web3modal/react";
import { useSnapshot } from "valtio";
import {
  fetchMyNFTs,
  replaceIpfsOrigin,
  signMessage,
  signUpSignature,
  verifyOwner,
  verifySignature,
} from "@/utils/function";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SketchPicker, SwatchesPicker } from "react-color";
import { useOutsideClick } from "rooks";
import axios from "axios";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

export default function HomeNFT({ canvasRef }) {
  const { isConnected, address } = useAccount();
  const snap = useSnapshot(state);
  const colorPickerPopup = useRef();
  const [listNFT, setListNFT] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signMessage, signMessageAsync } = useSignMessage();
  useOutsideClick(colorPickerPopup, () => setShowColorPicker(false));
  const onFetchNFT = async (address) => {
    const data = await fetchMyNFTs(address);
    setListNFT(data);
  };
  const onSignMessage = async ({ wallet_address, nonce }) => {
    const message = `I am signing my one-time nonce: ${nonce}`;
    const result = await signMessageAsync({ message });
    return result;
  };
  const onClickDownload = async () => {
    setLoading(true);
    axios
      .get(
        `${process.env.API_SIGNATURE_URL}/v1/users?wallet_address=${address}`
      )
      .then(async (res) => {
        const user = res.data?.values;
        if (!user) {
          return await signUpSignature(address);
        }
        return user;
      })
      .then((user) => onSignMessage(user))
      .then((signature) =>
        verifySignature({ wallet_address: address, signature })
      )
      .then(() =>
        verifyOwner({
          wallet_address: address,
          token_id: selected?.token_id,
          contract_address: selected?.token_address,
        })
      )
      .then((result) => {
        toast.success(
          "Verification Success, start downloading your design in a second..."
        );
        var canvasWrapper = document.getElementById("shirt-display");
        let canvas = canvasWrapper.getElementsByTagName("canvas")[0];
        setTimeout(() => {
          canvas.toBlob(function (blob) {
            saveAs(blob, `${selected?.metadata?.name}.png`);
          });
        }, 3000);
      })
      .catch((error) => toast.error(error?.response?.data?.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (address) {
      onFetchNFT(address);
    }
  }, [address]);
  return (
    <AnimatePresence mode="wait">
      {!snap.intro ? (
        <motion.div
          className="home-nft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <div className="nft-box">
            {!isConnected ? (
              <div className="nft-box__not-connected">
                <Web3Button />
              </div>
            ) : (
              <div className="nft-box__connected">
                {listNFT?.length ? (
                  <>
                    <div className="row row-button">
                      <div
                        className="color-picker"
                        role="presentation"
                        onClick={() => setShowColorPicker(true)}
                      >
                        <Image
                          src="/colorpicker.png"
                          width={50}
                          height={50}
                          alt="color-picker"
                        />
                        <AnimatePresence>
                          {showColorPicker && (
                            <motion.div
                              animate={{ opacity: 1 }}
                              initial={{ opacity: 0 }}
                              exit={{ opacity: 0 }}
                              className="color-picker-popup"
                              ref={colorPickerPopup}
                            >
                              <SwatchesPicker
                                color={snap.color}
                                disableAlpha
                                // TODO: ADD presetColors
                                onChange={(color) => (state.color = color.hex)}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <Web3Button />
                    </div>
                    <div className="row row-nft">
                      {listNFT?.length
                        ? listNFT?.map((item, i) => (
                            <div
                              className="col-6 col-nft__item"
                              key={`nft-item-${i}`}
                            >
                              <div
                                className={`nft-item__card ${
                                  item.token_id === selected?.token_id &&
                                  item?.symbol === selected?.symbol
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() => {
                                  setSelected(item);
                                  state.logoDecal = replaceIpfsOrigin(
                                    item?.metadata?.image
                                  );
                                }}
                                role="presentation"
                              >
                                <div
                                  className={`nft-item__card-image-wrapper`}
                                  role="presentation"
                                >
                                  <div className="outer-content">
                                    <div className="inner-content">
                                      <Image
                                        src={item?.image}
                                        fill
                                        alt={item?.metadata?.name}
                                        className="nft-item__card-image mw-100"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <h5 className="nft-item__card-title">
                                  {item?.metadata?.name}
                                </h5>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </>
                ) : (
                  <div className="nft-box__empty">
                    You don&apos;t have any NFT&apos;s. You can buy it first on
                    the marketplace!
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
      {selected && (
        <motion.div
          className="btn btn-outline-light btn-download"
          role="presentation"
          onClick={() => onClickDownload()}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          {loading ? "Loading ..." : "Download"}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
