import React, { useEffect } from "react";
import styles from "./ActionBar.module.scss";
import { motion } from "framer-motion";
import { iconVariants } from "./ActionBar.variants";

export const ActionBar = ({
  onPrevClick,
  onNextClick,
  isPaused,
  onPlayToggle,
  preface,
}) => {
  return (
    <div className={styles.actionBar}>
      <motion.a
        initial="idle"
        whileHover="hovered"
        className={styles.button}
        href="/assets/pdf/SandroAsatiani_ChaosidanCosmosamde.pdf"
        download
      >
        <motion.img
          variants={iconVariants}
          className={styles.icon}
          src="/assets/svgs/generic/download-icon.svg"
          alt="download pdf"
        />
        <img
          className={styles.buttonIcon}
          src="/assets/svgs/generic/download-button.svg"
          alt="download pdf button"
        />
      </motion.a>
      <button className={styles.button}>
        <motion.img
          variants={iconVariants}
          initial="idle"
          whileHover="hovered"
          className={styles.leftArrow}
          src="/assets/svgs/generic/left-arrow.svg"
          alt="left arrow"
          onClick={onPrevClick}
        />
        <motion.img
          variants={iconVariants}
          initial="idle"
          whileHover="hovered"
          className={styles.rightArrow}
          src="/assets/svgs/generic/right-arrow.svg"
          alt="right arrow"
          onClick={onNextClick}
        />
        <img
          className={styles.buttonIcon}
          src="/assets/svgs/generic/arrow-button.svg"
          alt="arrow button"
        />
      </button>
      {!preface && (
        <motion.button
          initial="idle"
          whileHover="hovered"
          className={styles.button}
          onClick={onPlayToggle}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isPaused ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <motion.img
              variants={iconVariants}
              className={styles.icon}
              src={"/assets/svgs/generic/play-icon.svg"}
              alt="toggle"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isPaused ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <motion.img
              variants={iconVariants}
              className={styles.icon}
              src={"/assets/svgs/generic/pause-icon.svg"}
              alt="toggle"
            />
          </motion.div>
          <img
            className={styles.buttonIcon}
            src="/assets/svgs/generic/toggle-button.svg"
            alt="toggle button"
          />
        </motion.button>
      )}
    </div>
  );
};
