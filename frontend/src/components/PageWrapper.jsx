// components/FadeInWrapper.jsx
import { motion } from "motion/react";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default PageWrapper;
