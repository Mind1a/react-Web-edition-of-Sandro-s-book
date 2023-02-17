import React from "react";
import styles from "./ActionBar.module.scss";
import { motion } from "framer-motion";
import { iconVariants } from "./ActionBar.variants";

export const ActionBar = ({ isPlaying, onPlayToggle }) => {
  return (
    <div className={styles.actionBar}>
      <motion.button
        initial="idle"
        whileHover="hovered"
        className={styles.button}
      >
        <motion.img
          variants={iconVariants}
          className={styles.icon}
          src="/assets/svgs/generic/download-icon.svg"
          alt="download pdf"
        />
        <img
          src="/assets/svgs/generic/download-button.svg"
          alt="download pdf button"
        />
      </motion.button>
      <button className={styles.button}>
        <motion.img
          variants={iconVariants}
          initial="idle"
          whileHover="hovered"
          className={styles.leftArrow}
          src="/assets/svgs/generic/left-arrow.svg"
          alt="left arrow"
        />
        <motion.img
          variants={iconVariants}
          initial="idle"
          whileHover="hovered"
          className={styles.rightArrow}
          src="/assets/svgs/generic/right-arrow.svg"
          alt="right arrow"
        />
        <img src="/assets/svgs/generic/arrow-button.svg" alt="arrow button" />
      </button>
      <motion.button
        initial="idle"
        whileHover="hovered"
        className={styles.button}
      >
        <motion.img
          variants={iconVariants}
          className={styles.icon}
          src={
            false
              ? "/assets/svgs/generic/play-icon.svg"
              : "/assets/svgs/generic/pause-icon.svg"
          }
          alt="toggle"
        />
        <img src="/assets/svgs/generic/toggle-button.svg" alt="toggle button" />
      </motion.button>
    </div>
  );
};
