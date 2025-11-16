import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface FadeOnScrollProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  amount?: number;
}

const FadeOnScroll = ({ children, className = "", id, delay = 0, amount = 0.9 }: FadeOnScrollProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    amount,
    margin: "-150px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
};

export default FadeOnScroll;

