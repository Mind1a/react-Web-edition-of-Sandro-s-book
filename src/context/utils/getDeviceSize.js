export const getDeviceSize = (width) => {
  if (width < 1350) {
    return "xs";
  }

  return "xl";
};
