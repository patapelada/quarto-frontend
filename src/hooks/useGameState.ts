import { useSocketConnection } from "@/hooks/useSocketConnection";
import { socket } from "@/socket";
import {
  Pieces,
  TurnIds,
  Turns,
  type CellType,
  type PieceId,
  type PieceType,
  type TurnId,
  type TurnType,
} from "@/types";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_BOARD = Array(4).fill(Array(4).fill(null));
const DEFAULT_AVAILABLE_PIECES = Array.from(
  { length: 16 },
  (_, i) => Pieces[i]
);

export function useGameState() {
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
  const [winnerId, setWinnerId] = useState<string | null>(null);

  const isItMyTurn = useMemo(
    () => currentPlayerId === userId,
    [currentPlayerId, userId]
  );
  const isGameReadyToStart = useMemo(
    () => !!gameId && !!opponentId,
    [gameId, opponentId]
  );
  const isGameOver = useMemo(() => !!winnerId, [winnerId]);
  const didIWin = useMemo(() => winnerId === userId, [winnerId, userId]);

  function newGame() {
    socket.emit("new-game");
  }

  function matchMaking() {
    socket.emit("matchmaking");
  }

  function startGame() {
    socket.emit("start-game", { gameId });
  }
  function pve() {
    socket.emit("pve");
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
      setWinnerId(data.winnerId);
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
    }

    socket.on("game-started", onGameStarted);

    return () => {
      socket.off("game-started", onGameStarted);
    };
  }, []);

  return {
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
    newGame,
    pve,
    matchMaking,
    startGame,
    selectPiece,
    placePiece,
  };
}
