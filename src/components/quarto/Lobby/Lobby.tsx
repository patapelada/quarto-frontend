import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";
import { useNavigate } from "react-router";

export function Lobby() {
  const game = useGameContext();
  const navigate = useNavigate();

  game.leaveGame();

  const handlePve = () => {
    game.pve();
    navigate("/game");
  };

  return (
    <div>
      <p>Server: {game.isConnected ? "Connected" : "Disconnected"}</p>
      <p>User ID: {game.userId || "Not connected"}</p>
      <p>Opponent ID: {game.opponentId || "Waiting for opponent"}</p>
      <p>
        Game ID: {game.gameId || "Not created yet"} -{" "}
        {game.isStarted ? "In Progress" : "Waiting to Start"}
      </p>
      <div className="flex gap-2">
        {!game.gameId && (
          <>
            <Button onClick={game.newGame}>New Game</Button>
            <Button onClick={game.matchMaking}>Matchmaking</Button>
            <Button onClick={handlePve}>Play vs. AI</Button>
          </>
        )}
        {game.isGameReadyToStart && !game.isStarted && (
          <Button onClick={game.startGame}>Start Game</Button>
        )}
      </div>
    </div>
  );
}
