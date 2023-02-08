import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <motion.div
      animate={{ width: ["0%", "100%", "50%"] }}
      transition={{ delay: 1, duration: 2 }}
    ></motion.div>
  );
};
