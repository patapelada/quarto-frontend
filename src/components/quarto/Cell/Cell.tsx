import { cn } from "@/lib/utils";
import { type CellType } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";

export interface Props {
  children?: React.ReactElement | null;
  cell: CellType;
  isDragging: boolean;
  isWinningCell?: boolean;
}

export function Cell({
  children,
  cell,
  isDragging,
  isWinningCell = false,
}: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: cell.id,
  });

  const validDropLocation = useMemo(() => !children, [children]);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex items-center justify-center w-16 h-16 border border-slate-300 rounded-lg p-2 bg-slate-50",
        "shadow-sm ",
        validDropLocation && isDragging && "bg-slate-100",
        validDropLocation && isOver && "bg-slate-200",
        isWinningCell && "border-2 border-slate-500"
      )}
      data-row={cell.position.row}
      data-col={cell.position.col}
    >
      {children}
    </div>
  );
}
