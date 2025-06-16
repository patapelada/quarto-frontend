import { cn } from "@/lib/utils";
import { type CellType } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";

export interface Props {
  children?: React.ReactElement | null;
  cell: CellType;
  isDragging: boolean;
}

export function Cell({ children, cell, isDragging }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: cell.id,
  });

  const validDropLocation = useMemo(() => !children, [children]);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex items-center justify-center w-24 h-24 border border-gray-300 rounded-lg",
        validDropLocation && isDragging && "bg-green-100",
        isOver && "bg-blue-100"
      )}
      data-row={cell.position.row}
      data-col={cell.position.col}
    >
      {children}
    </div>
  );
}
