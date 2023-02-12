import React, { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Navigation } from "../../components/Navigation";
import styles from "./Home.module.scss";
import { motion } from "framer-motion";
export const Home = () => {
  return (
    <div>
      <Loader width={["100%", "0%", "0%", "50%"]} />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 1.5 }}
        className={styles.eyeIcon}
        src="assets/svgs/generic/loader-icon.svg"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Navigation />

        <img
          className={styles.playIcon}
          src="assets/svgs/generic/playbutton-light.svg"
        />
        <span className={styles.playText}>დაწყება</span>
        <motion.span
          initial={{ right: "3%", bottom: "12%", fontSize: "4.5rem" }}
          animate={{ right: "4%", bottom: "14%", fontSize: "6.25rem" }}
          transition={{ delay: 1.5 }}
          className={styles.cosmosText}
        >
          კოსმოსამდე
        </motion.span>
      </motion.div>
    </div>
  );
};
