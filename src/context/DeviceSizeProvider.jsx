import React, { createContext, useContext, useEffect, useState } from "react";

export const DeviceSizeContext = createContext();

const DeviceSizeProvider = ({ children }) => {
  const [deviceSize, setDeviceSize] = useState(
    getDeviceSize(window.innerWidth)
  );

  const handleResize = () => {
    const width = window.innerWidth;
    setDeviceSize(getDeviceSize(width));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getDeviceSize(width) {
    if (width < 1350) {
      return "xs";
      // } else if (width < 768) {
      //   return "sm";
      // } else if (width < 992) {
      //   return "md";
      // } else if (width < 1200) {
      //   return "lg";
    } else {
      return "xl";
    }
  }

  return (
    <DeviceSizeContext.Provider value={deviceSize}>
      {children}
    </DeviceSizeContext.Provider>
  );
};

const useDeviceSize = () => useContext(DeviceSizeContext);

export { DeviceSizeProvider, useDeviceSize };
