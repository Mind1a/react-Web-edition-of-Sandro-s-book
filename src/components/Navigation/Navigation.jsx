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
        <img src="/assets/svgs/social-links/publish-icon.svg" alt="home" />
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
            src="/assets/svgs/social-links/burger.svg"
            alt="burger menu"
          />
          <img
            src="/assets/svgs/social-links/burger-button.svg"
            alt="burger menu button"
          />
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
            src="/assets/svgs/social-links/share.svg"
            alt="share"
          />
          <img
            className={styles.shareButton}
            src="/assets/svgs/social-links/share-button.svg"
            alt="share button"
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
            src="/assets/svgs/social-links/facebook.svg"
            alt="facebook"
          />
          <img
            className={styles.facebookButton}
            src="/assets/svgs/social-links/facebook-button.svg"
            alt="facebook button"
          />
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
            src="/assets/svgs/social-links/instagram.svg"
            alt="instagram"
          />
          <img
            className={styles.instagramButton}
            src="/assets/svgs/social-links/instagram-button.svg"
            alt="instagram button"
          />
        </motion.a>
      </div>
    </nav>
  );
};
