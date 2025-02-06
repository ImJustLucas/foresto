"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center p-8 rounded-xl shadow-xl bg-white/80 backdrop-blur-lg"
      >
        <h1 className="mb-4 text-8xl font-extrabold text-primary">Oups!</h1>
        <h2 className="mb-4 text-2xl font-semibold text-primary">
          An unexpected error has occurred.
        </h2>
        <p className="mb-6 text-lg text-muted-foreground">
          We can&apos;t find the page you&apos;re looking for.
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
