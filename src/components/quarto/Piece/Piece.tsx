import type { PieceType } from "@/types";
import { forwardRef } from "react";
import { PieceSvg } from "./Piece.svg";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  piece: PieceType;
  disabled?: boolean;
}

export const Piece = forwardRef<HTMLButtonElement, Props>(function Piece(
  { piece, disabled, ...props },
  ref
) {
  return (
    <button ref={ref} {...props}>
      <PieceSvg piece={piece} />
    </button>
  );
});
