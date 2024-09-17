import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function Board() {
    const [board, setBoard] = useState<string[][]>(Array(3).fill('').map(() => Array(3).fill('')));
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">('X');
    const [hasWinner, setHasWinner] = useState<boolean>(false);
    const [history, setHistory] = useState<string[]>([]);

    const switchPlayer = () => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const checkForWinner = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i].every(cell => cell === currentPlayer)) return true; 
            if (board.every(row => row[i] === currentPlayer)) return true;
        }

        if(board.every((row, idx) => row[idx] === currentPlayer)) return true;
        if (board.every((row, idx) => row[board.length - idx - 1] === currentPlayer)) return true;

        return false;
    }

    const handleClick = (rowIndex: number, colIndex: number) => {
        if (board[rowIndex][colIndex] !== '' || hasWinner) return;

        const newBoard = [...board];
        newBoard[rowIndex][colIndex] = currentPlayer;
        setBoard(newBoard);
        if(checkForWinner()){
            setHasWinner(true);
            return ;
        }
        switchPlayer();
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-center">Tic Tac Toe</h1>
            <h2 className="text-2xl font-bold text-center">Player {currentPlayer}</h2>
            <div className="mt-4">
                <div className="grid grid-cols-3 gap-3">
                    {board.map((row, rowIndex) =>
                        row.map((data, colIndex) =>
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleClick(rowIndex, colIndex)}
                                className="bg-primary-foreground rounded-md hover:bg-primary-foreground/90 cursor-pointer aspect-square p-0 flex items-center justify-center text-foreground">
                                <p className="text-9xl md:text-6xl">{data}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="mt-4">
                <Button>Reset</Button>
            </div>
        </>
    )
}

export default Board;