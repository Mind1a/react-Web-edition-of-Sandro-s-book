import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { clamp, getTimeLeft, getWidth } from "../../utils/book";
import styles from "./Book.module.scss";
import { bookData } from "../../bookData";
import { Navigation } from "../../components/Navigation";
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

  console.log(title, illustration);

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
    <div>
      <Navigation />

      <h4 className={styles.title}>{title}</h4>
      <span className={styles.timeLeft}>
        {getTimeLeft(duration, isSeeking ? seekTime : currentTime)}
      </span>
      <img
        className={styles.illustration}
        src={illustration}
        alt="illustration"
      />
      <Loader
        trackProgress
        initialWidth="100%"
        width={`${width * 100}%`}
        transition={{ duration: 0, ease: "easeOut" }}
        isSeeking={isSeeking}
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        onDrag={handleDrag}
      />
    </div>
  );
};
