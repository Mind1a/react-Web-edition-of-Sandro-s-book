import { motion } from "framer-motion";
import styles from "./Loader.module.scss";
import { useState, useEffect, useRef } from "react";

export const Loader = ({
  width,
  initialWidth,
  trackProgress,
  transition,
  handleTransition,
  isSeeking,
  onDragStart,
  onDragStop,
  onDrag,
}) => {
  const handleRef = useRef(null);
  const [initialX, setInitialX] = useState(null);

  const handleDragStart = (e) => {
    onDragStart();
    setInitialX(e.clientX);
  };

  const handleDragStop = () => {
    if (!isSeeking) return;

    const handle = handleRef.current;
    const margin = window.innerWidth * initialWidth;
    onDragStop(
      (handle.parentNode.clientWidth - margin) / (window.innerWidth - margin)
    );
  };

  const handleDrag = (e) => {
    e.preventDefault();
    const margin = window.innerWidth * initialWidth;
    if (e.buttons === 1 && isSeeking) {
      onDrag((e.clientX - initialX) / (window.innerWidth - margin));
    }
  };

  useEffect(() => {
    if (!trackProgress) return;
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleDragStop);

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragStop);
    };
  });

  return (
    <motion.div
      className={styles.loaderAnimation}
      animate={{ width: width }}
      transition={transition}
    >
      {trackProgress && (
        <motion.div
          ref={handleRef}
          initial={{ opacity: 0, borderWidth: 0 }}
          animate={{ opacity: 1, borderWidth: "8px" }}
          transition={handleTransition}
          onMouseDown={handleDragStart}
          className={styles.handle}
          draggable={false}
        />
      )}
    </motion.div>
  );
};
