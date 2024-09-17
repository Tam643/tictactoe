


import { Circle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Board as boardData } from "@/features/tictactoe/tictactoeSlice";
import TicTacToe, { player, playType } from "@/lib/boardgame/tictactoe/tictactoe";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useTicTacToe from "@/lib/boardgame/tictactoe/useTicTacToe";

const IconClass = "w-20 h-20";

const IconByPlayer = {
    "X": <X className={IconClass} />,
    "O": <Circle className={IconClass} />,
    "": ""
};


// const Square = ({
//     data,
//     className,
//     ...props
// }: React.HTMLAttributes<HTMLDivElement> & { data: boardData }) => {
//     console.log(data);
//     return (

//     )
// }

interface BoardProps {
    board: boardData[][];
    onClick: (row: number, col: number) => void;
}

interface WinnerLineProps {
    isOver: boolean;
    winnerLine: string | null;
}
const WinnerLine = ({
    isOver,
    winnerLine
}: WinnerLineProps) => {
    let lineClass = null;
    if (!isOver) return null;
    if (winnerLine === "row") lineClass = "left-[48%] top-0 h-full";
    if (winnerLine === "diag") lineClass = "-rotate-45 left-[48%] -top-[14%] h-[125%]";
    if (winnerLine === "rdiag") lineClass = " left-[48%] -top-[12%]  h-[125%] rotate-45";
    return (
        <div className={`bg-orange-500 h-0 overflow-hidden transition-height duration-500 ease-in-out absolute z-50 w-3 rounded-md ${lineClass}`}></div>
    );
}

interface BoardGameProps {
    playwith: playType;
}

export default function BoardGame(
    { playwith }: BoardGameProps
): JSX.Element {
   const { board, currentPlayer, isOver, winnerLine, move: makeMove, reset } = useTicTacToe(playwith);

    return (
        <>
            <h1 className="text-2xl text-center font-bold mb-2">Tic Tac Toe</h1>
            <p className="text-1xl text-center font-bold mb-4">This turn is: {currentPlayer}</p>
            <div className="text-primary-foreground relative">
                <WinnerLine isOver={isOver} winnerLine={winnerLine} />
                <div className="text-primary-foreground">
                    {
                        board.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center gap-2 mb-2 relative">
                                {
                                    row.map((cell, colIndex) => (
                                        <Fragment key={colIndex}>
                                            <div
                                                className="w-20 cursor-pointer h-20 bg-foreground hover:bg-foreground/90 rounded-lg"
                                                onClick={() => makeMove(rowIndex, colIndex)}
                                            >
                                                {IconByPlayer[cell]}
                                            </div>
                                        </Fragment>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <Button onClick={() => reset()} variant="destructive" className="mt-4">Reset Game</Button>
        </>
    )
}