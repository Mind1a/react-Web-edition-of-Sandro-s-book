import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { clamp, getTimeLeft, getWidth } from "../../utils/book";
import styles from "./Book.module.scss";
import { bookData } from "../../bookData";
import { Navigation } from "../../components/Navigation";
import { motion } from "framer-motion";
import { ActionBar } from "../../components/ActionBar";

export const Book = () => {
  const { book } = useParams();

  const {
    title,
    illustration,
    audio: audioSrc,
  } = useMemo(() => {
    console.log("memo");
    return bookData[book];
  }, [book]);

  const audio = useMemo(() => new Audio(audioSrc), [book]);

  const [isSeeking, setIsSeeking] = useState(false);
  const [width, setWidth] = useState(0.15);
  const [seekStartTime, setSeekStartTime] = useState(null);
  const [seekTime, setSeekTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.play().catch((err) => {
      console.log(err);
    });

    const handleAudioUpdate = () => {
      setCurrentTime(audio.currentTime);

      if (isSeeking || duration === 0) return;

      setWidth(getWidth(0.15, duration, audio.currentTime));
    };

    const handleAudioLoad = () => {
      setDuration(audio.duration);
    };

    const handleAudioEnd = () => {
      setCurrentTime(audio.duration);
    };

    audio.addEventListener("timeupdate", handleAudioUpdate);
    audio.addEventListener("canplaythrough", handleAudioLoad);
    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleAudioUpdate);
      audio.removeEventListener("canplaythrough", handleAudioLoad);
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, [book, isSeeking, duration]);

  const handleDragStart = () => {
    setIsSeeking(true);
    setSeekStartTime(currentTime);
  };

  const handleDragStop = (percentage) => {
    const newTime = audio.duration * percentage;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setIsSeeking(false);
  };

  const handleDrag = (percentageChange) => {
    setWidth(
      getWidth(0.15, duration, seekStartTime + percentageChange * duration)
    );
    setSeekTime(
      clamp(0, seekStartTime + percentageChange * duration, duration)
    );
  };

  return (
    <div className={styles.bookPage}>
      <Navigation />
      <ActionBar />

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
        <Loader width={["100%", "15%"]} />
      </motion.div>
      <motion.div
        initial={{ display: 0 }}
        animate={{ display: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Loader
          trackProgress
          width={`${width * 100}%`}
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
