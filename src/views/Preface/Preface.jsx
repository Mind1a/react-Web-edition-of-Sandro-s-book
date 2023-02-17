import React from "react";
import { Loader } from "../../components/Loader/Loader";
import styles from "./Preface.module.scss";

export const Preface = () => {
  return (
    <div>
      <Loader
        width={["100%", "15%"]}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};
