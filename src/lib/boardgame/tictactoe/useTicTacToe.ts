import { useEffect, useState } from "react";
import TicTacToe, { boardData, player, playType } from "@/lib/boardgame/tictactoe/tictactoe";

export default function useTicTacToe(
    type: playType
) {
    const [game] = useState<TicTacToe>(new TicTacToe(type));
    const [currentPlayer, setCurrentPlayer] = useState<player>(game.getCurrentPlayer());
    const [board, setBoard] = useState<boardData[][]>(game.getBoard());
    const [isOver, setIsOver] = useState<boolean>(game.getIsOver());
    const [winner, setWinner] = useState<player|null>(null);
    const [winnerLine, setWinnerLine] = useState<string | null>(null);
    
    const move = (row: number, col: number) => {
        game.move(row, col);
        setBoard([...game.getBoard()]);
        setCurrentPlayer(game.getCurrentPlayer());
        if (game.getIsOver()) {
            setIsOver(game.getIsOver());
            setWinner(game.getCurrentPlayer());
            setWinnerLine(game.checkWinLine());
        }
    }

    const reset = () => {
        game.reset();
        setBoard(game.getBoard());
        setCurrentPlayer(game.getCurrentPlayer());
        setIsOver(game.getIsOver());
        setWinnerLine(null);
    }

    useEffect(() => {
        reset();
    }, [type]);

    
    return {
        board,
        currentPlayer,
        isOver,
        winner,
        winnerLine,
        move,
        reset
    }
}