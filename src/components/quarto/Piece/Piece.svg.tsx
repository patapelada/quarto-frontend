import { cn } from "@/lib/utils";
import type { PieceType } from "@/types";

export type Props = {
  piece: PieceType;
};

export const PieceSvg = ({ piece }: Props) => {
  const size = 32;
  const strokeWidth = 1;
  const center = size / 2;
  const shapeSize = piece.traits.height === "short" ? 10 : 15;

  const cutoutSize = shapeSize * (piece.traits.height === "short" ? 0.55 : 0.6);
  const cutoutId =
    piece.traits.fill === "hollow" ? `cutout-mask-${piece.name}` : undefined;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      className={cn(
        piece.traits.color === "dark" && "fill-slate-600 stroke-slate-900",
        piece.traits.color === "light" && "stroke-slate-400 fill-slate-300"
      )}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <mask id={cutoutId}>
          <rect width="100%" height="100%" fill="white" />
          <circle cx={center} cy={center} r={cutoutSize} fill="black" />
        </mask>
      </defs>
      {piece.traits.shape === "round" ? (
        <circle
          cx={center}
          cy={center}
          r={shapeSize}
          strokeWidth={strokeWidth}
          mask={cutoutId ? `url(#${cutoutId})` : undefined}
        />
      ) : (
        <rect
          x={center - shapeSize}
          y={center - shapeSize}
          width={shapeSize * 2}
          height={shapeSize * 2}
          strokeWidth={strokeWidth}
          rx={3}
          mask={cutoutId ? `url(#${cutoutId})` : undefined}
        />
      )}
      {piece.traits.fill === "hollow" && (
        <circle
          className="fill-none"
          cx={center}
          cy={center}
          r={cutoutSize}
          strokeWidth={strokeWidth}
        />
      )}
    </svg>
  );
};
