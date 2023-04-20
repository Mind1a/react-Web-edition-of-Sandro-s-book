import React, { createContext, useContext, useEffect, useState } from "react";
import { getDeviceSize } from "./utils";

export const DeviceSizeContext = createContext();

const DeviceSizeProvider = ({ children }) => {
  const [deviceSize, setDeviceSize] = useState(() =>
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

  return (
    <DeviceSizeContext.Provider value={deviceSize}>
      {children}
    </DeviceSizeContext.Provider>
  );
};

const useDeviceSize = () => useContext(DeviceSizeContext);

export { DeviceSizeProvider, useDeviceSize };
