import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRelativeWidth } from "./useRelativeWidth";
import { clamp, getWidth } from "../utils/book";

export const useBookPlayer = (book, bookData, books, minAbsWidth) => {
  const navigate = useNavigate();

  const { audio: audioSrc } = useMemo(() => {
    return bookData[book];
  }, [book]);

  const audio = useMemo(() => new Audio(audioSrc), [book]);

  const [isSeeking, setIsSeeking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [initialWidth] = useRelativeWidth(minAbsWidth);
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
        : navigate(`/books/${books[clamp(1, index - 1, books.length - 1)]}`);
    }
  };

  const handleNextClick = () => {
    const index = books.findIndex((bookName) => {
      return bookName === book;
    });
    navigate(`/books/${books[clamp(1, index + 1, books.length - 1)]}`);
  };

  return {
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
  };
};
