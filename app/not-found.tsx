"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Gamepad2, RefreshCcw } from "lucide-react";

// Floating game elements
const floatingElements = [
  { icon: "🎮", size: 40, initialX: 10, initialY: 20 },
  { icon: "🕹️", size: 35, initialX: 80, initialY: 15 },
  { icon: "🎯", size: 30, initialX: 15, initialY: 70 },
  { icon: "🏆", size: 35, initialX: 85, initialY: 65 },
  { icon: "⭐", size: 25, initialX: 50, initialY: 10 },
  { icon: "🎲", size: 30, initialX: 90, initialY: 40 },
  { icon: "🃏", size: 35, initialX: 5, initialY: 45 },
  { icon: "💎", size: 28, initialX: 70, initialY: 80 },
];

function FloatingElement({
  icon,
  size,
  initialX,
  initialY,
  delay,
}: {
  icon: string;
  size: number;
  initialX: number;
  initialY: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        fontSize: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.2, 1],
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {icon}
    </motion.div>
  );
}

function InteractiveNumber({
  children,
  delay,
}: {
  children: string;
  delay: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.span
      className="inline-block cursor-pointer relative"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 50, rotateX: 90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.2,
        color: "#1f3cff",
        textShadow: "0 0 40px rgba(31, 60, 255, 0.5)",
      }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => {
        x.set(Math.random() * 10 - 5);
        y.set(Math.random() * 10 - 5);
      }}
      onHoverEnd={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

function GlitchText({ text }: { text: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <span className={isGlitching ? "opacity-0" : ""}>{text}</span>
      {isGlitching && (
        <>
          <span className="absolute left-0 top-0 text-red-500 animate-pulse" style={{ clipPath: "inset(0 0 50% 0)" }}>
            {text}
          </span>
          <span className="absolute left-0 top-0 text-blue-500 animate-pulse" style={{ clipPath: "inset(50% 0 0 0)" }}>
            {text}
          </span>
        </>
      )}
    </span>
  );
}

export default function NotFound() {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const messages = [
    "Oops! This page got lost in the game.",
    "Looks like this level doesn't exist!",
    "404: Achievement Not Unlocked",
    "Game Over... Page Not Found!",
    "This quest leads nowhere...",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    setCurrentMessage((prev) => (prev + 1) % messages.length);

    if (clickCount >= 4) {
      setShowEasterEgg(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background via-background to-muted">
      {/* Floating background elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement
          key={index}
          {...element}
          delay={index * 0.3}
        />
      ))}

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} />
      </div>

      {/* Glowing orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* 404 Number */}
        <motion.div
          className="text-[150px] md:text-[200px] font-black leading-none mb-4 text-foreground"
          onClick={handleClick}
        >
          <InteractiveNumber delay={0}>4</InteractiveNumber>
          <InteractiveNumber delay={0.1}>0</InteractiveNumber>
          <InteractiveNumber delay={0.2}>4</InteractiveNumber>
        </motion.div>

        {/* Error message with glitch effect */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlitchText text="Page Not Found" />
        </motion.h1>

        {/* Playful rotating message */}
        <motion.p
          key={currentMessage}
          className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {messages[currentMessage]}
        </motion.p>

        {/* Easter egg */}
        {showEasterEgg && (
          <motion.div
            className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-sm text-primary font-medium">
              🎉 Secret Achievement Unlocked: Persistent Clicker!
            </p>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/">
              <Button size="lg" className="gap-2 px-8">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/games">
              <Button size="lg" variant="outline" className="gap-2 px-8">
                <Gamepad2 className="w-4 h-4" />
                Explore Games
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Refresh hint */}
        <motion.button
          onClick={handleClick}
          className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCcw className="w-3 h-3" />
          Click for a new message
        </motion.button>

        {/* Click counter (subtle) */}
        {clickCount > 0 && (
          <motion.p
            className="mt-4 text-xs text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Clicks: {clickCount} {clickCount >= 5 && "🏆"}
          </motion.p>
        )}
      </div>

      {/* Decorative corner elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-20 h-20 border-r-2 border-b-2 border-primary/20 rounded-br-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
      />
    </div>
  );
}
