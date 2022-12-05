import { SLoader } from "./Loading.styled";

export const Loader = () => {
  return (
    <SLoader
      animate={{ width: ["0%", "100%", "50%"] }}
      transition={{ delay: 1, duration: 2 }}
    >
      loader
    </SLoader>
  );
};
