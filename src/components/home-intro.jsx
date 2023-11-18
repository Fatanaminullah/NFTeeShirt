import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";

function HomeIntro() {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro ? (
        <motion.div
          className="home-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <h1 className={`title `}>
            <small>Wear Your NFTs:</small>
            <br></br> Turn Your Digital Art Into Custom Shirts
          </h1>
          <p className={`description`}>
            Customize and print your NFTs onto high-quality shirts
          </p>
          <button
            className="btn btn-primary"
            onClick={() => (state.intro = false)}
          >
            Customize Now
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default HomeIntro;
