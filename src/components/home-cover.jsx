import { Web3Button } from "@web3modal/react"
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
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
    return (
        <section className="sc-home-cover">
            <Particles id="tsparticles" url="/particlesjs-config.json" init={particlesInit} loaded={particlesLoaded} />
            <div className="py-main">
                <div className="container">
                    <h1 className={`title `}>Wear Your NFTs:<br></br> Turn Your Digital Art Into Custom Shirts</h1>
                    <p className={`description`}>Connect your wallet and print your NFTs onto high-quality shirts</p>
                    {/* <div className={anim(3)}> */}
                    <Web3Button />
                    {/* </div> */}
                </div>
            </div>
        </section>
    )
}

export default HomeCover
