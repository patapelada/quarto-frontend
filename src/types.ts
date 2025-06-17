import { z } from "zod";

const pieceId = {
  LRTS: 0b0000,
  LRTH: 0b0001,
  LRSS: 0b0010,
  LRSH: 0b0011,

  LSTS: 0b0100,
  LSTH: 0b0101,
  LSSS: 0b0110,
  LSSH: 0b0111,

  DRTS: 0b1000,
  DRTH: 0b1001,
  DRSS: 0b1010,
  DRSH: 0b1011,

  DSTS: 0b1100,
  DSTH: 0b1101,
  DSSS: 0b1110,
  DSSH: 0b1111,
} as const;
export const PieceIdSchema = z.nativeEnum(pieceId);
export type PieceId = z.infer<typeof PieceIdSchema>;

export const PieceSchema = z.object({
  name: z.string(),
  value: PieceIdSchema,
  traits: z.object({
    color: z.enum(["light", "dark"]),
    shape: z.enum(["round", "square"]),
    height: z.enum(["tall", "short"]),
    fill: z.enum(["solid", "hollow"]),
  }),
});
export type PieceType = z.infer<typeof PieceSchema>;

export const Pieces: { [key: string]: PieceType } = {
  [PieceIdSchema.enum.LRTS]: {
    name: "LRTS",
    value: PieceIdSchema.enum.LRTS,
    traits: {
      color: "light",
      shape: "round",
      height: "tall",
      fill: "solid",
    },
  },
  [PieceIdSchema.enum.LRTH]: {
    name: "LRTH",
    value: PieceIdSchema.enum.LRTH,
    traits: {
      color: "light",
      shape: "round",
      height: "tall",
      fill: "hollow",
    },
  },
  [PieceIdSchema.enum.LRSS]: {
    name: "LRSS",
    value: PieceIdSchema.enum.LRSS,
    traits: {
      color: "light",
      shape: "round",
      height: "short",
      fill: "solid",
    },
  },
  [PieceIdSchema.enum.LRSH]: {
    name: "LRSH",
    value: PieceIdSchema.enum.LRSH,
    traits: {
      color: "light",
      shape: "round",
      height: "short",
      fill: "hollow",
    },
  },

  [PieceIdSchema.enum.LSTS]: {
    name: "LSTS",
    value: PieceIdSchema.enum.LSTS,
    traits: {
      color: "light",
      shape: "square",
      height: "tall",
      fill: "solid",
    },
  },
  [PieceIdSchema.enum.LSTH]: {
    name: "LSTH",
    value: PieceIdSchema.enum.LSTH,
    traits: {
      color: "light",
      shape: "square",
      height: "tall",
      fill: "hollow",
    },
  },
  [PieceIdSchema.enum.LSSS]: {
    name: "LSSS",
    value: PieceIdSchema.enum.LSSS,
    traits: {
      color: "light",
      shape: "square",
      height: "short",
      fill: "solid",
    },
  },
  [PieceIdSchema.enum.LSSH]: {
    name: "LSSH",
    value: PieceIdSchema.enum.LSSH,
    traits: {
      color: "light",
      shape: "square",
      height: "short",
      fill: "hollow",
    },
  },

  [PieceIdSchema.enum.DRTS]: {
    name: "DRTS",
    value: PieceIdSchema.enum.DRTS,
    traits: {
      color: "dark",
      shape: "round",
      height: "tall",
      fill: "solid",
    },
  },
  [PieceIdSchema.enum.DRTH]: {
    name: "DRTH",
    value: PieceIdSchema.enum.DRTH,
    traits: {
      color: "dark",
      shape: "round",
      height: "tall",
      fill: "hollow",
    },
  },
  [PieceIdSchema.enum.DRSS]: {
    name: "DRSS",
    value: PieceIdSchema.enum.DRSS,
    traits: {
      color: "dark",
      shape: "round",
      height: "short",
      fill: "solid",
    },
  },
  [PieceIdSchema.enum.DRSH]: {
    name: "DRSH",
    value: PieceIdSchema.enum.DRSH,
    traits: {
      color: "dark",
      shape: "round",
      height: "short",
      fill: "hollow",
    },
  },

  [PieceIdSchema.enum.DSTS]: {
    name: "DSTS",
    value: PieceIdSchema.enum.DSTS,
    traits: {
      color: "dark",
      shape: "square",
      height: "tall",
      fill: "solid",
    },
  },
  [PieceIdSchema.enum.DSTH]: {
    name: "DSTH",
    value: PieceIdSchema.enum.DSTH,
    traits: {
      color: "dark",
      shape: "square",
      height: "tall",
      fill: "hollow",
    },
  },
  [PieceIdSchema.enum.DSSS]: {
    name: "DSSS",
    value: PieceIdSchema.enum.DSSS,
    traits: {
      color: "dark",
      shape: "square",
      height: "short",
      fill: "solid",
    },
  },
  [PieceIdSchema.enum.DSSH]: {
    name: "DSSH",
    value: PieceIdSchema.enum.DSSH,
    traits: {
      color: "dark",
      shape: "square",
      height: "short",
      fill: "hollow",
    },
  },
} as const;

export const TurnIds = {
  PICK: 0,
  PLACE: 1,
};
export const TurnIdSchema = z.nativeEnum(TurnIds);
export type TurnId = z.infer<typeof TurnIdSchema>;

export const TurnSchema = z.object({
  id: TurnIdSchema,
  name: z.string(),
});
export type TurnType = z.infer<typeof TurnSchema>;
export const Turns: { [key: string]: TurnType } = {
  [TurnIdSchema.enum.PICK]: {
    id: TurnIdSchema.enum.PICK,
    name: "Pick",
  },
  [TurnIdSchema.enum.PLACE]: {
    id: TurnIdSchema.enum.PLACE,
    name: "Place",
  },
} as const;

const cellId = {
  A1: 0b1100,
  A2: 0b1000,
  A3: 0b0100,
  A4: 0b0000,
  B1: 0b1101,
  B2: 0b1001,
  B3: 0b0101,
  B4: 0b0001,
  C1: 0b1110,
  C2: 0b1010,
  C3: 0b0110,
  C4: 0b0010,
  D1: 0b1111,
  D2: 0b1011,
  D3: 0b0111,
  D4: 0b0011,
} as const;
export const CellIdSchema = z.nativeEnum(cellId);
export type CellId = z.infer<typeof CellIdSchema>;

export const CellSchema = z.object({
  id: CellIdSchema,
  name: z.string(),
  position: z.object({
    row: z.number(),
    col: z.number(),
  }),
});
export type CellType = z.infer<typeof CellSchema>;

export const Cells: { [key: string]: CellType } = {
  [CellIdSchema.enum.A1]: {
    id: CellIdSchema.enum.A1,
    name: "A1",
    position: { row: 3, col: 0 },
  },
  [CellIdSchema.enum.A2]: {
    id: CellIdSchema.enum.A2,
    name: "A2",
    position: { row: 2, col: 0 },
  },
  [CellIdSchema.enum.A3]: {
    id: CellIdSchema.enum.A3,
    name: "A3",
    position: { row: 1, col: 0 },
  },
  [CellIdSchema.enum.A4]: {
    id: CellIdSchema.enum.A4,
    name: "A4",
    position: { row: 0, col: 0 },
  },
  [CellIdSchema.enum.B1]: {
    id: CellIdSchema.enum.B1,
    name: "B1",
    position: { row: 3, col: 1 },
  },
  [CellIdSchema.enum.B2]: {
    id: CellIdSchema.enum.B2,
    name: "B2",
    position: { row: 2, col: 1 },
  },
  [CellIdSchema.enum.B3]: {
    id: CellIdSchema.enum.B3,
    name: "B3",
    position: { row: 1, col: 1 },
  },
  [CellIdSchema.enum.B4]: {
    id: CellIdSchema.enum.B4,
    name: "B4",
    position: { row: 0, col: 1 },
  },
  [CellIdSchema.enum.C1]: {
    id: CellIdSchema.enum.C1,
    name: "C1",
    position: { row: 3, col: 2 },
  },
  [CellIdSchema.enum.C2]: {
    id: CellIdSchema.enum.C2,
    name: "C2",
    position: { row: 2, col: 2 },
  },
  [CellIdSchema.enum.C3]: {
    id: CellIdSchema.enum.C3,
    name: "C3",
    position: { row: 1, col: 2 },
  },
  [CellIdSchema.enum.C4]: {
    id: CellIdSchema.enum.C4,
    name: "C4",
    position: { row: 0, col: 2 },
  },
  [CellIdSchema.enum.D1]: {
    id: CellIdSchema.enum.D1,
    name: "D1",
    position: { row: 3, col: 3 },
  },
  [CellIdSchema.enum.D2]: {
    id: CellIdSchema.enum.D2,
    name: "D2",
    position: { row: 2, col: 3 },
  },
  [CellIdSchema.enum.D3]: {
    id: CellIdSchema.enum.D3,
    name: "D3",
    position: { row: 1, col: 3 },
  },
  [CellIdSchema.enum.D4]: {
    id: CellIdSchema.enum.D4,
    name: "D4",
    position: { row: 0, col: 3 },
  },
} as const;
