"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-200 to-green-300 bg-[length:200%_200%] z-[-1]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="mb-4 text-9xl font-extrabold text-primary">404</h1>
        <h2 className="mb-4 text-4xl font-bold ">
          Oops! This page cannot be found.
        </h2>
        <p className="mb-6 text-lg text-muted-foreground">
          You seem to be lost in the forest... but don&apos;t panic!
        </p>

        <Button
          asChild
          className="bg-primary hover:bg-primary/80 text-primary-foreground"
        >
          <Link href={ROUTES.HOMEPAGE}>Go back home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
