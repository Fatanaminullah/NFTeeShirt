import { Web3Button } from "@web3modal/react"
import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import { animateScroll, scroller } from "react-scroll";
import { loadFull } from "tsparticles";
import { useAccount } from "wagmi";
// import { useScrollAnim } from "src/hooks/hooks"

function HomeCover() {
    // const [trigger, anim] = useScrollAnim()
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
    const { address, isConnected } = useAccount()
    const [isConnecting, setIsConnecting] = useState()
    useEffect(() => {
        if (isConnected && isConnecting) {
            console.log("shoudl be heree")
            setIsConnecting(false)
            scroller.scrollTo('home-nft', {
                duration: 500,
                delay: 100,
                smooth: true,
            })
        }
    }, [isConnected, isConnecting])
    console.log("state", isConnecting)
    return (
        <section className="sc-home-cover">
            <Particles
                id="tsparticles"
                url="/particlesjs-config.json"
                init={particlesInit}
                loaded={particlesLoaded}
                style={{ position: "absolute !important", zIndex: 0 }}
            />
            <div className="py-main">
                <div className="container">
                    <h1 className={`title `}>Wear Your NFTs:<br></br> Turn Your Digital Art Into Custom Shirts</h1>
                    <p className={`description`}>Connect your wallet and print your NFTs onto high-quality shirts</p>
                    {/* <div className={anim(3)}> */}
                    <Web3Button onClick={() => setIsConnecting(!isConnected)} />
                    {/* </div> */}
                </div>
            </div>
        </section>
    )
}

export default HomeCover
