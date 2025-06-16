import { useDraggable } from "@dnd-kit/core";
import { Piece, type PieceProps } from ".";

export function DraggablePiece(props: PieceProps) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: props.piece.value,
  });

  return (
    <Piece
      ref={setNodeRef}
      style={{
        opacity: isDragging ? 0.5 : undefined,
      }}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
}
