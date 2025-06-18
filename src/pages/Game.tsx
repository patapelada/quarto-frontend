import { Quarto } from "@/components/quarto/Quarto";
import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

export const Game = () => {
  const game = useGameContext();
  const navigate = useNavigate();

  const handleLeaveGame = useCallback(() => {
    console.log("Leaving game, navigating to home");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (!game.isConnected) {
      console.log("Not connected, navigating to home");
      navigate("/");
    }
  }, [game.isConnected, navigate]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-colgap-2">
        <Button
          className="mb-4"
          onClick={handleLeaveGame}
          disabled={!game.isStarted}
          variant="outline"
        >
          <ArrowLeft />
          Leave Game
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Quarto />
      </div>
    </div>
  );
};
