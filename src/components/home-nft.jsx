import { AnimatePresence, motion } from "framer-motion";
import state from "../store";
import { useAccount } from "wagmi";
import { Web3Button } from "@web3modal/react";
import { useSnapshot } from "valtio";
import { fetchMyNFTs, replaceIpfsOrigin } from "@/utils/function";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SketchPicker, SwatchesPicker } from "react-color";
import { useOutsideClick } from "rooks";

export default function HomeNFT() {
  const { isConnected, address } = useAccount();
  const snap = useSnapshot(state);
  const colorPickerPopup = useRef();
  const [listNFT, setListNFT] = useState([]);
  const [selected, setSelected] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const onFetchNFT = async (address) => {
    const data = await fetchMyNFTs(address);
    setListNFT(data);
  };
  useOutsideClick(colorPickerPopup, () => setShowColorPicker(false));
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
                                        src={replaceIpfsOrigin(
                                          item?.metadata?.image
                                        )}
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
                    You don&apos;t have any NFT&apos;s. You can buy it first
                    on the marketplace!
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
