import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { clamp, getTimeLeft, getWidth } from "../../utils/book";
import styles from "./Book.module.scss";
export const Book = () => {
  const { book } = useParams();

  const [audio] = useState(new Audio(`/assets/mp3/${book}.mp3`));
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
    <div>
      <span className={styles.timeLeft}>
        Book View: {book} :{" "}
        {getTimeLeft(duration, isSeeking ? seekTime : currentTime)}
      </span>
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
