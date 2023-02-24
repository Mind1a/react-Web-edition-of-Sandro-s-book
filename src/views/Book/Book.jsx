import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { clamp, getTimeLeft, getWidth } from "../../utils/book";
import styles from "./Book.module.scss";
import { bookData, books } from "../../bookData";
import { Navigation } from "../../components/Navigation";
import { motion } from "framer-motion";
import { ActionBar } from "../../components/ActionBar";
import { useNavigate } from "react-router-dom";
import { useRelativeWidth } from "../../hooks/useRelativeWidth";

export const Book = () => {
  const { book } = useParams();

  const navigate = useNavigate();

  const {
    title,
    illustration,
    audio: audioSrc,
  } = useMemo(() => {
    return bookData[book];
  }, [book]);

  const audio = useMemo(() => new Audio(audioSrc), [book]);

  const [isSeeking, setIsSeeking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [initialWidth] = useRelativeWidth(233);
  const [width, setWidth] = useState(initialWidth);
  const [seekStartTime, setSeekStartTime] = useState(null);
  const [seekTime, setSeekTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.play().catch((err) => {
      console.log(err);
      setIsPaused(true);
    });

    const handleAudioUpdate = () => {
      setCurrentTime(audio.currentTime);

      if (isSeeking || duration === 0) return;

      setWidth(getWidth(initialWidth, duration, audio.currentTime));
    };

    const handleAudioLoad = () => {
      setDuration(audio.duration);
    };

    const handleAudioEnd = () => {
      setCurrentTime(audio.duration);
    };

    const handleToggle = () => {
      setIsPaused(audio.paused);
    };

    audio.addEventListener("timeupdate", handleAudioUpdate);
    audio.addEventListener("pause", handleToggle);
    audio.addEventListener("play", handleToggle);
    audio.addEventListener("canplaythrough", handleAudioLoad);
    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleAudioUpdate);
      audio.removeEventListener("pause", handleToggle);
      audio.removeEventListener("play", handleToggle);
      audio.removeEventListener("canplaythrough", handleAudioLoad);
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, [audio, book, initialWidth, isSeeking, duration]);

  useEffect(() => {
    if (audio.paused) {
      setWidth(getWidth(initialWidth, duration, currentTime));
    }
  }, [initialWidth]);

  const handlePlayToggle = () => {
    if (audio.paused) {
      audio.play().catch((err) => {
        console.log(err);
        setIsPaused(true);
      });
    } else {
      audio.pause();
    }
  };

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
      getWidth(
        initialWidth,
        duration,
        seekStartTime + percentageChange * duration
      )
    );
    setSeekTime(
      clamp(0, seekStartTime + percentageChange * duration, duration)
    );
  };

  const handlePrevClick = () => {
    const index = books.findIndex((bookName) => {
      return bookName === book;
    });
    {
      book === "qaosidan-kosmosamde"
        ? navigate("/preface")
        : navigate(`/books/${books[clamp(1, index - 1, 12)]}`);
    }
  };

  const handleNextClick = () => {
    const index = books.findIndex((bookName) => {
      return bookName === book;
    });
    navigate(`/books/${books[clamp(1, index + 1, 11)]}`);
  };

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
