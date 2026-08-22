"use client";

import React, { useRef, useState, useEffect, forwardRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DraggableCardBody = ({
  className,
  children,
  containerRef,
}: {
  className?: string;
  children?: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [constraints, setConstraints] = useState<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>({
    top: -150,
    left: -350,
    right: 350,
    bottom: 150,
  });

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [-200, 200], [15, -15]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], [-15, 15]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(mouseX, [-200, 0, 200], [0.9, 1, 0.9]),
    springConfig
  );

  const glareOpacity = useSpring(
    useTransform(mouseX, [-200, 0, 200], [0.12, 0, 0.12]),
    springConfig
  );

  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        if (containerRef && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setConstraints({
            top: -rect.height / 3.2,
            bottom: rect.height / 3.2,
            left: -rect.width / 2.6,
            right: rect.width / 2.6,
          });
        } else {
          setConstraints({
            top: -140,
            bottom: 140,
            left: -Math.min(450, window.innerWidth / 3),
            right: Math.min(450, window.innerWidth / 3),
          });
        }
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [containerRef]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={containerRef ? containerRef : constraints}
      dragElastic={0.08}
      dragMomentum={true}
      onDragStart={() => {
        if (typeof document !== "undefined") {
          document.body.style.cursor = "grabbing";
        }
      }}
      onDragEnd={(event, info) => {
        if (typeof document !== "undefined") {
          document.body.style.cursor = "default";
        }

        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig,
          },
        });
        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();

        const velocityMagnitude = Math.sqrt(
          currentVelocityX * currentVelocityX +
            currentVelocityY * currentVelocityY
        );
        const bounce = Math.min(0.6, velocityMagnitude / 1200);

        animate(info.point.x, info.point.x + currentVelocityX * 0.25, {
          duration: 0.7,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 60,
          damping: 18,
          mass: 0.7,
        });

        animate(info.point.y, info.point.y + currentVelocityY * 0.25, {
          duration: 0.7,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 60,
          damping: 18,
          mass: 0.7,
        });
      }}
      style={{
        rotateX,
        rotateY,
        opacity,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{ scale: 1.04 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative min-h-[280px] w-72 sm:w-80 md:w-[340px] overflow-hidden rounded-2xl bg-[#17120e] border border-[#3d332a] p-4 sm:p-5 shadow-2xl transform-3d select-none cursor-grab transition-shadow hover:shadow-[#D4A373]/20",
        className
      )}
    >
      {children}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-white/10 select-none"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children }, ref) => {
  return (
    <div ref={ref} className={cn("[perspective:3000px]", className)}>
      {children}
    </div>
  );
});

DraggableCardContainer.displayName = "DraggableCardContainer";
