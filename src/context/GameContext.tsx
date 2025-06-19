import { useSocketConnection } from "@/hooks/useSocketConnection";
import { socket } from "@/socket";
import {
  Cells,
  Pieces,
  TurnIds,
  Turns,
  type CellId,
  type CellType,
  type PieceId,
  type PieceType,
  type TurnId,
  type TurnType,
} from "@/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const DEFAULT_BOARD = Array(4).fill(Array(4).fill(null));
const DEFAULT_AVAILABLE_PIECES = Array.from(
  { length: 16 },
  (_, i) => Pieces[i]
);

type GameContextType = {
  isConnected: boolean | null;
  board: Array<Array<PieceType | null>>;
  availablePieces: PieceType[];
  currentPiece: PieceType | null;
  gameId: string | null;
  userId: string | null;
  opponentId: string | null;
  currentTurn: TurnType;
  currentPlayerId: string | null;
  isItMyTurn: boolean;
  isGameReadyToStart: boolean;
  isStarted: boolean;
  isGameOver: boolean;
  didIWin: boolean;
  winningLines: Array<Array<CellType>>;
  newGame: () => void;
  pve: () => void;
  matchMaking: () => void;
  startGame: () => void;
  joinGame: (gameId: string) => void;
  selectPiece: (piece: PieceType) => void;
  placePiece: (cell: CellType) => void;
  leaveGame: () => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, userId } = useSocketConnection();

  const [gameId, setGameId] = useState<string | null>(null);
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [board, setBoard] =
    useState<Array<Array<PieceType | null>>>(DEFAULT_BOARD);
  const [availablePieces, setAvailablePieces] = useState<PieceType[]>(
    DEFAULT_AVAILABLE_PIECES
  );
  const [currentPiece, setCurrentPiece] = useState<PieceType | null>(null);
  const [currentTurn, setCurrentTurn] = useState<TurnType>(Turns[TurnIds.PICK]);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [winningLines, setWinningLines] = useState<Array<Array<CellType>>>([]);

  const isItMyTurn = useMemo(
    () => currentPlayerId === userId,
    [currentPlayerId, userId]
  );
  const isGameReadyToStart = useMemo(
    () => !!gameId && !!opponentId,
    [gameId, opponentId]
  );
  const didIWin = useMemo(() => winnerId === userId, [winnerId, userId]);

  function reset() {
    setGameId(null);
    setOpponentId(null);
    setIsStarted(false);
    setBoard(DEFAULT_BOARD);
    setAvailablePieces(DEFAULT_AVAILABLE_PIECES);
    setCurrentPiece(null);
    setCurrentTurn(Turns[TurnIds.PICK]);
    setCurrentPlayerId(null);
    setIsGameOver(false);
    setWinnerId(null);
    setWinningLines([]);
  }

  function newGame() {
    socket.emit("new-game");
  }

  function matchMaking() {
    socket.emit("matchmaking");
  }

  function startGame() {
    socket.emit("start-game", { gameId });
  }

  function joinGame(gameId: string) {
    socket.emit("join-game", { gameId });
  }

  function pve() {
    socket.emit("pve");
  }

  function leaveGame() {
    socket.emit("leave-game");
  }

  function selectPiece(piece: PieceType) {
    if (isItMyTurn && availablePieces.includes(piece)) {
      socket.emit("select-piece", {
        gameId,
        piece: piece.value,
      });
    }
  }

  function placePiece(cell: CellType) {
    socket.emit("place-piece", {
      gameId,
      cell: cell.id,
    });
  }

  useEffect(() => {
    function onGameStateUpdated(data: {
      gameId: string;
      currentTurn: TurnId;
      currentPlayerId: string | null;
      currentPiece: PieceId | null;
      board: Array<Array<PieceId | null>>;
      availablePieces: Array<PieceId>;
      winnerId: string | null;
      gameOver: boolean;
      winningLines: Array<Array<CellId>>;
    }) {
      console.log("Game state updated:", data);
      setCurrentTurn(Turns[data.currentTurn]);
      setCurrentPlayerId(data.currentPlayerId);
      setCurrentPiece(
        (data.currentPiece !== null && Pieces[data.currentPiece]) || null
      );
      setAvailablePieces(data.availablePieces.map((id) => Pieces[id]));
      setBoard(
        data.board.map((row) =>
          row.map((pieceId) => (pieceId !== null ? Pieces[pieceId] : null))
        )
      );

      setIsGameOver(data.gameOver);
      setWinnerId(data.winnerId);
      setWinningLines(
        data.winningLines.map((line) => line.map((cellId) => Cells[cellId]))
      );
    }
    socket.on("game-state-updated", onGameStateUpdated);
    return () => {
      socket.off("game-state-updated", onGameStateUpdated);
    };
  }, []);

  useEffect(() => {
    function onPlayerJoined(data: { gameId: string; playerId: string }) {
      console.log("Player joined:", data.playerId);
      setOpponentId(data.playerId);
    }

    socket.on("player-joined", onPlayerJoined);

    return () => {
      socket.off("player-joined", onPlayerJoined);
    };
  }, []);

  useEffect(() => {
    function onGameLeft(data: { gameId: string }) {
      console.log("Game left:", data.gameId);
      reset();
    }

    socket.on("game-left", onGameLeft);

    return () => {
      socket.off("game-left", onGameLeft);
    };
  }, []);

  useEffect(() => {
    function onGameJoined(data: { gameId: string; players: Array<string> }) {
      console.log("Game joined with ID:", data.gameId);
      setGameId(data.gameId);
      setOpponentId(data.players.find((id) => id !== userId) || null);
    }

    socket.on("game-joined", onGameJoined);

    return () => {
      socket.off("game-joined", onGameJoined);
    };
  }, [userId]);

  useEffect(() => {
    function onGameStarted(_data: { gameId: string }) {
      console.log("Game started:");
      setIsStarted(true);

      if (typeof window !== "undefined" && window.dispatchEvent) {
        const gameStartedEvent = new CustomEvent("game-started");
        window.dispatchEvent(gameStartedEvent);
      }
    }

    socket.on("game-started", onGameStarted);

    return () => {
      socket.off("game-started", onGameStarted);
    };
  }, []);

  const value: GameContextType = {
    isConnected,
    board,
    availablePieces,
    currentPiece,
    gameId,
    userId,
    opponentId,
    currentTurn,
    currentPlayerId,
    isItMyTurn,
    isGameReadyToStart,
    isStarted,
    isGameOver,
    didIWin,
    winningLines,
    newGame,
    joinGame,
    pve,
    matchMaking,
    startGame,
    leaveGame,
    selectPiece,
    placePiece,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
