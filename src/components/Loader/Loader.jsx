import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <motion.div
      className="min-h-full fixed left-0 top-0 bg-main-gray"
      animate={{ width: ["0%", "100%", "50%"] }}
      transition={{ delay: 1, duration: 2 }}
    ></motion.div>
  );
};
