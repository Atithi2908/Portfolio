"use client";

import React, { useMemo, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  clickedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows,
  cols,
  clickedCell,
  onCellClick,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  return (
    <div
      className={cn("grid w-full h-full gap-1 pointer-events-auto", className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;

        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;

        const delay = clickedCell ? Math.max(0, distance * 45) : 0; // ms
        const duration = 220 + distance * 40; // ms

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "relative h-full w-full rounded-[2px] border border-neutral-900/60 bg-neutral-950/40 opacity-40 transition-opacity duration-150 will-change-transform cursor-pointer hover:opacity-90 hover:border-[#D4A373]/60 hover:bg-[#D4A373]/20 hover:shadow-[0_0_12px_rgba(212,163,115,0.3)]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]"
            )}
            style={style}
            onClick={() => onCellClick(rowIdx, colIdx)}
          />
        );
      })}
    </div>
  );
};

export const BackgroundRippleEffect = ({
  rows = 16,
  cols = 32,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);

  const handleCellClick = (row: number, col: number) => {
    setClickedCell({ row, col });
    setRippleKey((prev) => prev + 1);
  };

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 flex h-full w-full items-center justify-center overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black)]",
        className
      )}
    >
      <DivGrid
        key={`ripple-${rippleKey}`}
        rows={rows}
        cols={cols}
        clickedCell={clickedCell}
        onCellClick={handleCellClick}
      />
    </div>
  );
};
