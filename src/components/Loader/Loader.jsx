import { motion } from "framer-motion";
import styles from "./Loader.module.scss";
export const Loader = ({ width }) => {
  return (
    <motion.div
      className={styles.loaderAnimation}
      initial={{ width: "0%" }}
      animate={{ width: width }}
      transition={{ duration: 1 }}
    ></motion.div>
  );
};
