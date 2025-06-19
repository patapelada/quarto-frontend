import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGameContext } from "@/context/GameContext";
import { AlertCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { JoinGameForm } from "./JoinGameForm";

export function Lobby() {
  const game = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGameStarted = () => {
      console.log("Game started event received");
      navigate("/game");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("game-started", handleGameStarted);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("game-started", handleGameStarted);
      }
    };
  }, [navigate]);

  useEffect(() => {
    console.log("Lobby useEffect: isConnected", game.isConnected);
    game.newGame();
    // since we want to run this only once when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {game.isConnected === null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Skeleton className="h-[125px] border shadow-sm rounded-xl" />
          <Skeleton className="h-[125px] border shadow-sm rounded-xl" />
        </div>
      )}
      {game.isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PvPCard />
          <PvECard />
        </div>
      )}
      {game.isConnected === false && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to connect to the server!</AlertTitle>
          <AlertDescription>
            Please try again or reach out to support if the issue persists.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export function PvECard() {
  const game = useGameContext();
  const navigate = useNavigate();

  const handlePve = () => {
    game.pve();
    navigate("/game");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Play with AI</CardTitle>
        <CardDescription>
          Challenge yourself against our AI opponent.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex grow items-end">
        <Button onClick={handlePve} className="flex-1">
          Start Game
        </Button>
      </CardFooter>
    </Card>
  );
}

export function PvPCard() {
  const game = useGameContext();

  const handleStartGame = () => {
    game.startGame();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Play with a Friend</CardTitle>
        <CardDescription>
          Invite a friend to play with you by sharing your game ID or joining
          their game.
        </CardDescription>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="font-mono"
                onClick={() => {
                  navigator.clipboard.writeText(game.gameId || "N/A");
                }}
              >
                {game.gameId || "N/A"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to copy your Game ID</p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent>
        <JoinGameForm />
      </CardContent>
      <CardFooter className="flex grow items-end">
        <Button
          onClick={handleStartGame}
          disabled={!game.isGameReadyToStart}
          className="flex-1"
        >
          Start Game
        </Button>
      </CardFooter>
    </Card>
  );
}
