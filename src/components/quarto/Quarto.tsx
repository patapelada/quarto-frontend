import { useGameState } from "@/hooks/useGameState";
import { cn } from "@/lib/utils";
import { Cells, Pieces, TurnIds } from "@/types";
import { DndContext, DragOverlay, type DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { Board } from "./Board";
import { Cell } from "./Cell";
import { DraggablePiece, Piece } from "./Piece";

export function Quarto() {
  const game = useGameState();
  const [isDragging, setIsDragging] = useState(false);

  function positionToCell(row: number, col: number) {
    const cell = Object.values(Cells).find(
      (cell) => cell.position.row === row && cell.position.col === col
    );
    if (!cell) {
      throw new Error(`Cell not found for position (${row}, ${col})`);
    }
    return cell;
  }

  function handleDragStart() {
    setIsDragging(true);
  }
  function handleDragCancel() {
    setIsDragging(false);
  }

  function handleDragEnd(event: DragEndEvent) {
    setIsDragging(false);
    if (event.over === null) {
      return;
    }
    if (event.active.id !== game.currentPiece?.value) {
      console.error(
        `Active piece id ${event.active.id} does not match moving piece id ${game.currentPiece?.value}`
      );
      return;
    }
    const cell = Object.values(Cells).find(
      (cell) => cell.id === event.over?.id
    );
    if (!cell) {
      console.error(`Cell with id ${event.over?.id} not found`);
      return;
    }
    if (game.board[cell.position.row][cell.position.col] !== null) {
      console.error(
        `Cell at position (${cell.position.row}, ${cell.position.col}) is already occupied`
      );
      return;
    }

    console.log("Dropping piece:", game.currentPiece, "into cell:", cell);
    game.placePiece(cell);
  }

  return (
    <div className="flex flex-col gap-4">
      <DndContext
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 flex-col sm:flex-row">
          {
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-2xl font-semibold tracking-tight">
                Game Board
              </h3>
              <Board>
                {game.board.map((row, rowIndex) =>
                  row.map((piece, colIndex) => (
                    <Cell
                      isDragging={isDragging}
                      cell={positionToCell(rowIndex, colIndex)}
                      key={`${rowIndex}-${colIndex}`}
                    >
                      {piece && <Piece piece={piece} />}
                    </Cell>
                  ))
                )}
              </Board>
            </div>
          }
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-tight">
              {game.isStarted
                ? game.isItMyTurn && game.currentTurn.id === TurnIds.PLACE
                  ? "Your Piece to Place"
                  : "Opponent's Piece"
                : "Piece to Place"}
            </h3>
            <div className="flex flex-row sm:flex-col gap-4 items-center">
              <div className="flex flex-col">
                <div className="w-16 h-16 border border-slate-300 rounded-lg p-2 bg-slate-50">
                  {game.currentPiece ? (
                    <DraggablePiece
                      disabled={!game.isItMyTurn}
                      piece={game.currentPiece}
                      className={cn(
                        game.isItMyTurn &&
                          "transition duration-300 ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-105"
                      )}
                    />
                  ) : null}
                </div>
              </div>
              <span className="text-muted-foreground text-sm sm:text-center w-36">
                {!game.isGameOver
                  ? game.isItMyTurn
                    ? game.currentTurn.id === TurnIds.PLACE
                      ? "Drag your piece to a cell to place it."
                      : "Click on a available piece to select it"
                    : "Waiting for your opponent..."
                  : null}
              </span>
              <div className="text-lg font-semibold">
                {game.isGameOver
                  ? game.didIWin
                    ? "You Win!"
                    : "You Lose!"
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="mb-4 flex flex-col items-start gap-4">
            <h3 className="text-2xl font-semibold tracking-tight">
              Available Pieces
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {Object.values(Pieces).map((piece) => {
                function wrap(child: React.ReactNode | null = null) {
                  return (
                    <div
                      className="w-16 h-16 border border-slate-300 rounded-lg p-2 bg-slate-50"
                      key={piece.value}
                    >
                      {child}
                    </div>
                  );
                }
                if (
                  !game.availablePieces.some((p) => p.value === piece.value)
                ) {
                  return wrap();
                }

                const pieceArgs = game.isItMyTurn &&
                  game.currentTurn.id === TurnIds.PICK &&
                  game.isStarted && {
                    onClick: () => game.selectPiece(piece),
                    className:
                      "transition duration-300 ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-105",
                  };

                return wrap(<Piece piece={piece} {...pieceArgs} />);
              })}
            </div>
          </div>
        </div>
        <DragOverlay dropAnimation={null}>
          {game.currentPiece == null ? null : (
            <Piece piece={game.currentPiece} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
