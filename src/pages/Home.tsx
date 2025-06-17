import { Lobby } from "@/components/quarto/Lobby";
import { Piece } from "@/components/quarto/Piece";
import { H1 } from "@/components/ui/h1";
import { H2 } from "@/components/ui/h2";
import { H3 } from "@/components/ui/h3";
import { Lead } from "@/components/ui/lead";
import { Pieces } from "@/types";

export const Home = () => {
  const examples = [
    {
      trait: "Shape",
      values: [
        { name: "Round", value: Pieces[0] },
        { name: "Square", value: Pieces[4] },
      ],
    },
    {
      trait: "Color",
      values: [
        { name: "Light", value: Pieces[0] },
        { name: "Dark", value: Pieces[8] },
      ],
    },
    {
      trait: "Size",
      values: [
        { name: "Big", value: Pieces[4] },
        { name: "Small", value: Pieces[6] },
      ],
    },
    {
      trait: "Solidity",
      values: [
        { name: "Solid", value: Pieces[0] },
        { name: "Hollow", value: Pieces[1] },
      ],
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <H1 className="">Welcome to Quarto</H1>
          <Lead>
            Quarto is a 2-player abstract strategy game played on a 4x4 board
            with 16 unique pieces.
          </Lead>
        </div>
        <Lobby></Lobby>
        <div className="flex flex-col gap-4">
          <H2>How to Play</H2>
          <p>
            The Objective is to create a line of four pieces (horizontal,
            vertical, or diagonal) that share at least one common
            characteristic:
          </p>
          <div className="flex flex-wrap gap-6">
            {examples.map((example) => (
              <div key={example.trait} className="flex flex-col gap-2">
                <span className="font-bold text-center">{example.trait}</span>
                <div className="flex gap-2">
                  {example.values.map((value) => (
                    <div key={value.name} className="flex flex-col gap-2">
                      <div className="w-16 h-16 border border-slate-300 rounded-lg p-2 bg-slate-50">
                        <Piece piece={value.value} />
                      </div>
                      <span className="text-center">{value.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p>
            <span className="font-bold">The twist:</span> you choose the piece
            your opponent must place on the board.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <H3>Gameplay</H3>
          <ul className="ml-6 list-decimal [&>li]:mt-2">
            <li>
              Player A chooses a piece (from the 16 available) and gives it to
              Player B.
            </li>
            <li>
              Player B places the piece on any empty square, then selects a new
              piece (from the remaining 15) and gives it to Player A.
            </li>
            <li>
              Continue until someone forms a winning line or all squares are
              filled (draw).
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
