import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Piece, type PieceProps } from ".";

export function DraggablePiece(props: PieceProps) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: props.piece.value,
  });

  const { className, ...restProps } = props;

  return (
    <Piece
      ref={props.disabled ? undefined : setNodeRef}
      className={cn(
        "touch-manipulation",
        className,
        isDragging && "cursor-grabbing opacity-50"
      )}
      {...restProps}
      {...attributes}
      {...listeners}
    />
  );
}
