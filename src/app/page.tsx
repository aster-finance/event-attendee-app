"use client";

import { AuroraBackground } from "./ArouraBackground";
import { motion } from "framer-motion";

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
              <h1 className="text-6xl font-bold text-text">Luma Saver</h1>
              <h2 className="text-2xl font-medium text-text">
                See everyone who you attended events withm faster than ever
              </h2>
              <button className="btn btn-neutral">
                Download our Chrome Extension
              </button>
            </div>
            <div className="roundend-2xl h-1/2 w-full bg-purple-100">
              <p>Image here</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
