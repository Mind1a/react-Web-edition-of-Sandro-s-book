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
  mobile,
  touchRef,
}) => {
  const handleRef = useRef(null);
  const [initialX, setInitialX] = useState(null);

  const handleDragStart = (e) => {
    onDragStart();
    setInitialX(e.clientX);
  };

  const handleTouchDragStart = (e) => {
    onDragStart();
    setInitialX(e.touches[0].clientX);
  };

  const handleDragStop = () => {
    if (!isSeeking) return;
    const handle = handleRef.current;
    const margin = document.getElementById("root").clientWidth * initialWidth;
    onDragStop(
      (handle.parentNode.clientWidth - margin) /
        (document.getElementById("root").clientWidth - margin)
    );
  };

  const handleDrag = (e) => {
    e.preventDefault();
    const margin = document.getElementById("root").clientWidth * initialWidth;
    if (e.buttons === 1 && isSeeking) {
      onDrag(
        (e.clientX - initialX) /
          (document.getElementById("root").clientWidth - margin)
      );
    }
  };

  const handleTouchDrag = (e) => {
    const margin = document.getElementById("root").clientWidth * initialWidth;
    if (isSeeking) {
      onDrag(
        (e.touches[0].clientX - initialX) /
          (document.getElementById("root").clientWidth - margin)
      );
    }
  };

  useEffect(() => {
    if (!trackProgress) return;
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("touchmove", handleTouchDrag, { passive: false });
    window.addEventListener("mouseup", handleDragStop);
    window.addEventListener("touchend", handleDragStop);

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("touchmove", handleTouchDrag, {
        passive: false,
      });
      window.removeEventListener("mouseup", handleDragStop);
      window.removeEventListener("touchend", handleDragStop);
    };
  });

  return (
    <motion.div
      className={mobile ? styles.loaderAnimationMobile : styles.loaderAnimation}
      animate={{ width: width }}
      transition={transition}
    >
      {trackProgress && (
        <motion.div
          ref={handleRef}
          initial={{ opacity: 0, borderWidth: 0 }}
          animate={{ opacity: 1, borderWidth: mobile ? "6px" : "8px" }}
          transition={handleTransition}
          onMouseDown={handleDragStart}
          onTouchStart={handleTouchDragStart}
          className={mobile ? styles.handleMobile : styles.handle}
          draggable={false}
        />
      )}
    </motion.div>
  );
};
