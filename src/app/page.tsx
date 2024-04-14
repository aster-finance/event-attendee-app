"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "./ArouraBackground";

export default function HomePage() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        <div className="flex min-h-screen justify-center">
          <div className="flex max-w-5xl items-center justify-center gap-12">
            <div className="flex w-full flex-col gap-6">
              <h1 className="text-6xl font-bold text-text">Who was at</h1>
              <h2 className="text-2xl font-medium text-text">
                See everyone you've ever attended events with
              </h2>
              <a className="btn btn-neutral">Download the Chrome Extension</a>
            </div>
            <div className="h-1/2 w-full rounded-2xl ">
              <img src="/logo.png" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
