import { motion } from "framer-motion";
import styles from "./Loader.module.scss";
export const Loader = () => {
  return (
    <motion.div
      className={styles.loaderAnimation}
      animate={{ width: ["100%", "0%"] }}
      transition={{ delay: 1, duration: 1 }}
    ></motion.div>
  );
};
