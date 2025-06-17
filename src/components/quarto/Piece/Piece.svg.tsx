import type { ColorTraitsType, PieceType } from "@/types";

export type Props = {
  piece: PieceType;
};

const fillColorMap: Record<ColorTraitsType, string> = {
  light: "#94a3b8",
  dark: "#1e293b",
};
const strokeColorMap: Record<ColorTraitsType, string> = {
  light: "#64748b",
  dark: "#020617",
};

export const PieceSvg = ({ piece }: Props) => {
  const size = 32;
  const fill = fillColorMap[piece.traits.color];
  const stroke = strokeColorMap[piece.traits.color];
  const strokeWidth = 1;
  const center = size / 2;
  const shapeSize =
    (size - strokeWidth) / (piece.traits.height === "short" ? 3 : 2);

  const cutoutSize = shapeSize * (piece.traits.height === "short" ? 0.55 : 0.6);
  const cutoutId =
    piece.traits.fill === "hollow" ? `cutout-mask-${piece.name}` : undefined;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <mask id={cutoutId}>
          <rect width="100%" height="100%" fill="white" />
          <circle cx={center} cy={center} r={cutoutSize} fill="black" />
        </mask>
        <radialGradient id="cutoutShade" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="black" stopOpacity="0.2" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </radialGradient>
      </defs>
      {piece.traits.shape === "round" ? (
        <circle
          cx={center}
          cy={center}
          r={shapeSize}
          stroke={stroke}
          fill={fill}
          strokeWidth={strokeWidth}
          mask={cutoutId ? `url(#${cutoutId})` : undefined}
        />
      ) : (
        <rect
          x={center - shapeSize}
          y={center - shapeSize}
          width={shapeSize * 2}
          height={shapeSize * 2}
          stroke={stroke}
          fill={fill}
          strokeWidth={strokeWidth}
          rx={1}
          mask={cutoutId ? `url(#${cutoutId})` : undefined}
        />
      )}
      {piece.traits.fill === "hollow" && (
        <circle
          cx={center}
          cy={center}
          r={cutoutSize}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          pointerEvents="none"
        />
      )}
    </svg>
  );
};
