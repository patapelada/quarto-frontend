import type { PieceType } from "@/types";

export type Props = {
  piece: PieceType;
};

export const PieceSvg = ({ piece }: Props) => {
  const size = 32;
  const stroke = piece.traits.color === "dark" ? "#1e293b" : "#94a3b8";
  const fillColor = piece.traits.fill === "solid" ? stroke : "none";
  const strokeWidth = 3;
  const center = size / 2;
  const shapeSize = (size - strokeWidth) / 2;
  const yAdjustment = piece.traits.height === "short" ? shapeSize / 1.2 : 0;
  const clipPath =
    piece.traits.height === "short" ? "url(#cut-off)" : undefined;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <clipPath id="cut-off">
        <rect x="0" y="0" width={size} height={size - strokeWidth} />
      </clipPath>
      {piece.traits.shape === "round" ? (
        <circle
          cx={center}
          cy={center + yAdjustment}
          r={shapeSize}
          stroke={stroke}
          fill={fillColor}
          strokeWidth={strokeWidth}
          clipPath={clipPath}
        />
      ) : (
        <rect
          x={center - shapeSize}
          y={center - shapeSize + yAdjustment}
          width={shapeSize * 2}
          height={shapeSize * 2}
          stroke={stroke}
          fill={fillColor}
          strokeWidth={strokeWidth}
          rx={1}
          clipPath={clipPath}
        />
      )}
    </svg>
  );
};
