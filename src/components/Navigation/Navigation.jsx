import React from "react";
import styles from "./Navigation.module.scss";
import { motion } from "framer-motion";
import { iconVariants } from "./Navigation.variants";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <a href="/" className={styles.homeLink}>
        <img src="assets/svgs/social-links/publish-icon.svg" />
      </a>
      <div className={styles.navGroup}>
        <MotionLink
          to="/contents"
          initial="idle"
          whileHover="hovered"
          className={styles.burgerButton}
        >
          <motion.img
            variants={iconVariants}
            className={styles.buttonIcon}
            src="assets/svgs/social-links/burger.svg"
          />
          <img src="assets/svgs/social-links/burger-button.svg" />
        </MotionLink>
        <motion.a
          href="https://sandroasatiani.com/"
          target="_blank"
          initial="idle"
          whileHover="hovered"
          className={styles.shareLink}
        >
          <motion.img
            variants={iconVariants}
            className={styles.buttonIcon}
            src="assets/svgs/social-links/share.svg"
          />
          <img
            className={styles.shareButton}
            src="assets/svgs/social-links/share-button.svg"
          />
        </motion.a>
        <motion.a
          href="https://www.facebook.com/sandro.asatiani"
          target="_blank"
          initial="idle"
          whileHover="hovered"
          className={styles.facebookLink}
        >
          <motion.img
            variants={iconVariants}
            className={styles.buttonIcon}
            src="assets/svgs/social-links/facebook.svg"
          />
          <img src="assets/svgs/social-links/facebook-button.svg" />
        </motion.a>

        <motion.a
          href="https://www.instagram.com/sandrosbooks/"
          target="_blank"
          initial="idle"
          whileHover="hovered"
          className={styles.instagramLink}
        >
          <motion.img
            variants={iconVariants}
            className={styles.buttonIcon}
            src="assets/svgs/social-links/instagram.svg"
          />
          <img
            className={styles.instagramButton}
            src="assets/svgs/social-links/instagram-button.svg"
          />
        </motion.a>
      </div>
    </nav>
  );
};
