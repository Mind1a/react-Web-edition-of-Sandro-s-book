export const getTimeLeft = (duration, currentTime) => {
  const timeLeft = clamp(0, Math.floor(duration - currentTime), duration);

  let mins = Math.floor(timeLeft / 60);
  let secs = timeLeft % 60;

  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;
  return `${mins}:${secs}`;
};

export const getWidth = (min, duration, currentTime) => {
  if (currentTime < 0 || duration < 0) return min;
  const percentage = clamp(min, (currentTime / duration) * (1 - min) + min, 1);
  return isNaN(percentage) ? min : percentage;
};

export const clamp = (min, val, max) => {
  return Math.min(Math.max(min, val), max);
};
