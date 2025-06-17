import { useGameState } from "@/hooks/useGameState";
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
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3 text-center text-lg font-bold">
        {game.isGameOver ? (game.didIWin ? "You Win!" : "You Lose!") : ""}
      </div>
      <DndContext
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <div className="col-start-1 col-span-2">
          {
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
          }
        </div>
        <div className="col-start-3">
          <h2 className="text-center">Selected Piece</h2>
          <div className="flex flex-col items-center">
            {game.currentPiece ? (
              game.isItMyTurn ? (
                <DraggablePiece
                  piece={game.currentPiece}
                  className="h-16 w-16"
                />
              ) : (
                <Piece piece={game.currentPiece} className="h-16 w-16" />
              )
            ) : (
              <div className="h-16 w-16"></div>
            )}
          </div>
          <h2 className="text-center">Available Pieces</h2>
          <div className="grid grid-cols-4 gap-4">
            {Object.values(Pieces).map((piece) => {
              const isAvailable = game.availablePieces.some(
                (p) => p.value === piece.value
              );
              if (
                !game.isItMyTurn ||
                game.currentTurn.id === TurnIds.PLACE ||
                !game.isStarted
              ) {
                return isAvailable ? (
                  <Piece
                    key={piece.value}
                    piece={piece}
                    className="h-16 w-16"
                  />
                ) : (
                  <div className="h-16 w-16" key={piece.value}></div>
                );
              }
              return isAvailable ? (
                <Piece
                  key={piece.value}
                  piece={piece}
                  className="h-16 w-16 hover:cursor-pointer"
                  onClick={() => game.selectPiece(piece)}
                />
              ) : (
                <div className="h-16 w-16" key={piece.value}></div>
              );
            })}
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
