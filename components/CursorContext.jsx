"use client";

import React, { useState, useEffect, createContext } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "react-responsive";

// Create context
const CursorContext = createContext();

// Provider
const CursorProvider = ({ children }) => {
  const [cursorSize, setCursorSize] = useState(30);
  const [cursorBackground, setCursorBackground] = useState("#473936");
  const [isHovering, setIsHovering] = useState(false);
  const smallViewportIsActive = useMediaQuery({
    query: "(max-width: 1200px)",
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 290, mass: 0.45 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!smallViewportIsActive) {
      mouseX.set(e.clientX - cursorSize / 2);
      mouseY.set(e.clientY - cursorSize / 2);
    } else {
      setCursorSize(0);
      setCursorBackground("none");
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [smallViewportIsActive, cursorSize]);

  const mouseEnterHandler = () => {
    setCursorSize(90);
    setCursorBackground("#00423a");
    setIsHovering(true);
  };

  const mouseLeaveHandler = () => {
    setCursorSize(30);
    setCursorBackground("#473936");
    setIsHovering(false);
  };

  return (
    <CursorContext.Provider value={{ mouseEnterHandler, mouseLeaveHandler }}>
      <motion.div
        className="fixed z-[99] rounded-full pointer-events-none transition-all duration-300"
        style={{
          left: springX,
          top: springY,
          width: cursorSize,
          height: cursorSize,
          backgroundColor: cursorBackground,
          mixBlendMode: isHovering ? "difference" : "normal",
          transition: "width 0.2s ease-in-out, height 0.2s ease-in-out",
        }}
      />
      {children}
    </CursorContext.Provider>
  );
};

export { CursorContext, CursorProvider };
