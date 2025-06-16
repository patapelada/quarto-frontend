import { Quarto } from "@/components/quarto/Quarto";
import { Button } from "@/components/ui/button";
import { useGameState } from "@/hooks/useGameState";

export const Game = () => {
  const gameState = useGameState();

  return (
    <div className="flex flex-col items-center gap-2 ">
      <p>Server: {gameState.isConnected ? "Connected" : "Disconnected"}</p>
      <p>User ID: {gameState.userId || "Not connected"}</p>
      <p>Opponent ID: {gameState.opponentId || "Waiting for opponent"}</p>
      <p>
        Game ID: {gameState.gameId || "Not created yet"} -{" "}
        {gameState.isStarted ? "In Progress" : "Waiting to Start"}
      </p>
      <div className="flex gap-2">
        {!gameState.gameId && (
          <>
            <Button onClick={gameState.newGame}>New Game</Button>
            <Button onClick={gameState.matchMaking}>Matchmaking</Button>
            <Button onClick={gameState.pve}>Play vs. AI</Button>
          </>
        )}
        {gameState.isGameReadyToStart && !gameState.isStarted && (
          <Button onClick={gameState.startGame}>Start Game</Button>
        )}
      </div>
      <Quarto />
    </div>
  );
};
