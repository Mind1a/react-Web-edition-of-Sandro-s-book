import React from "react";
import { motion } from "framer-motion";
import styles from "./ChaosLetters.module.scss";
import { letterAnimations } from "./ChaosLetters.animations";
const ChaosLetters = ({ transition }) => {
  const mainLetterTransition = {
    delay: transition.delay + 0.5,
    duration: 2,
    ease: "linear",
    type: "spring",
  };

  const minorLetterTransition = {
    delay: mainLetterTransition.delay,
    duration: 1,
    ease: "easeOut",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.letterGroup}
      transition={transition}
    >
      <motion.img
        className={styles.letterQ}
        src="assets/svgs/letters/letter-q.svg"
        animate={letterAnimations.q}
        transition={mainLetterTransition}
        alt="letter q"
      />
      <motion.img
        className={styles.letterBoldA}
        src="assets/svgs/letters/letter-a-bold.svg"
        animate={letterAnimations.boldA}
        transition={mainLetterTransition}
        alt="letter a"
      />
      <motion.img
        className={styles.letterBoldO}
        src="assets/svgs/letters/letter-o-bold.svg"
        animate={letterAnimations.boldO}
        transition={mainLetterTransition}
        alt="letter o"
      />
      <motion.img
        className={styles.letterS}
        src="assets/svgs/letters/letter-s.svg"
        animate={letterAnimations.s}
        transition={mainLetterTransition}
        alt="letter s"
      />
      <motion.img
        className={styles.letterI}
        src="assets/svgs/letters/letter-i.svg"
        animate={letterAnimations.i}
        transition={mainLetterTransition}
        alt="letter i"
      />
      <motion.img
        className={styles.letterD}
        src="assets/svgs/letters/letter-d.svg"
        animate={letterAnimations.d}
        transition={minorLetterTransition}
        alt="letter d"
      />
      <motion.img
        className={styles.letterA}
        src="assets/svgs/letters/letter-a.svg"
        animate={letterAnimations.a}
        transition={minorLetterTransition}
        alt="letter a"
      />
      <motion.img
        className={styles.letterN}
        src="assets/svgs/letters/letter-n.svg"
        animate={letterAnimations.n}
        transition={minorLetterTransition}
        alt="letter n"
      />
    </motion.div>
  );
};

export default ChaosLetters;
