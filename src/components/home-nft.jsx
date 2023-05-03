import { fetchMyNFTs, replaceIpfsOrigin } from "@/utils/function";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Element } from "react-scroll"
import { useAccount } from "wagmi";


function HomeNFT() {
    const { isConnected, address } = useAccount();
    const [showComponent, setShowComponent] = useState(false);
    const [listNFT, setListNFT] = useState([])
    const [selected, setSelected] = useState({})
    const onFetchNFT = async (address) => {
        const data = await fetchMyNFTs(address)
        setListNFT(data)
    }
    useEffect(() => {
        if (address) {
            onFetchNFT(address)
        }
    }, [address])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShowComponent(true);
        }
    }, []);
    console.log("listtt", listNFT)

    return showComponent ? (
        <Element name="home-nft">
            {isConnected ? (
                <section className="sc-home-nft">
                    <div className="py-5">
                        <div className="container">
                            <h1 className={`title mb-4`}>Select your NFT</h1>
                            <div className="row row-nft">
                                {listNFT?.map((item, i) => (
                                    <div className="col-6 col-md-4 col-lg-3 col-nft__item" key={`nft-item-${i}`}>
                                        <div className={`nft-item__card ${item.tokenId === selected?.tokenId ? "selected" : ""}`}
                                            onClick={() => setSelected(item)}
                                            role="presentation"
                                        >
                                            <div
                                                className={`nft-item__card-image-wrapper`}
                                                role="presentation"
                                            >
                                                <div className="outer-content">
                                                    <div className="inner-content">
                                                        <Image
                                                            src={replaceIpfsOrigin(item?.metadata?.image)}
                                                            fill
                                                            alt={item?.metadata?.name}
                                                            className="nft-item__card-image mw-100"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 className="nft-item__card-title">{item?.metadata?.name}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </Element>
    ) : null;
}

export default HomeNFT
