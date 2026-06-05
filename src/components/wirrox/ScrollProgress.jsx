import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0">
      <div className="w-px h-28 bg-rule relative overflow-hidden">
        <motion.div
          className="w-full bg-bronze absolute top-0 left-0 origin-top"
          style={{ scaleY: progress }}
          transition={{ duration: 0.08 }}
        />
      </div>
    </div>
  );
}