"use client";

import { motion } from "framer-motion";

export const LoadingScreen: React.FC = () => {
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-white"
      style={{ background: "radial-gradient(circle, #ECFDF5, #FFFFFF)" }}
    >
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-green-500 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};
