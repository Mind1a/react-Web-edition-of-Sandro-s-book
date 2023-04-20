import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { clamp, getTimeLeft, getWidth } from "../../utils/book";
import styles from "./Book.module.scss";
import { bookData, books } from "../../bookData";
import { Navigation } from "../../components/Navigation";
import { motion } from "framer-motion";
import { ActionBar } from "../../components/ActionBar";

import { useBookPlayer } from "../../hooks/useBookPlayer";

export const Book = () => {
  const { book } = useParams();
  const { title, illustration } = bookData[book];

  const {
    width,
    initialWidth,
    duration,
    currentTime,
    seekTime,
    isSeeking,
    isPaused,
    handleDrag,
    handleDragStart,
    handleDragStop,
    handlePlayToggle,
    handleNextClick,
    handlePrevClick,
  } = useBookPlayer(book, bookData, books, 233);

  return (
    <div className={styles.bookPage}>
      <Navigation />
      <ActionBar
        isPaused={isPaused}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        onPlayToggle={handlePlayToggle}
      />
      <h4 className={styles.title}>{title}</h4>
      <span className={styles.timeLeft}>
        {getTimeLeft(duration, isSeeking ? seekTime : currentTime)}
      </span>
      <img
        className={styles.illustration}
        src={illustration}
        alt="illustration"
      />
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1, duration: 0 }}
        style={{ pointerEvents: "none" }}
      >
        <Loader width={["100%", `${initialWidth * 100}%`]} />
      </motion.div>
      <motion.div
        initial={{ display: 0 }}
        animate={{ display: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Loader
          trackProgress
          width={`${width * 100}%`}
          initialWidth={initialWidth}
          isSeeking={isSeeking}
          transition={{ duration: 0 }}
          handleTransition={{ duration: 0.2, delay: 0.8 }}
          onDragStart={handleDragStart}
          onDragStop={handleDragStop}
          onDrag={handleDrag}
        />
      </motion.div>
    </div>
  );
};
