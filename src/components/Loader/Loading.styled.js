import styled from "styled-components";
import { motion } from "framer-motion";

export const SLoader = styled(motion.div)`
    min-height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #181818;
`;