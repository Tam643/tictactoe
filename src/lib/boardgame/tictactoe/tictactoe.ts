export type playType = "bot" | "friend";
export type player = "X" | "O";
export type boardData = "X" | "O" | "";

export interface gameState {
    winnerLine: {
        type: "row" | "col" | "diag" | "rdiag";
        
    }
    state: "winner" | "draw" | "playing";
}
export default class TicTacToe {

    private board: boardData[][] = Array(3).fill('').map(() => Array(3).fill(''));
    private playType: playType | null = null;
    private isOver: boolean = false;
    private currentPlayer: player = "X";

    constructor(
        type: playType,
    ) {
        this.playType = type;
    }

    getCurrentPlayer(): player {
        return this.currentPlayer;
    }

    getBoard(): boardData[][] {
        return this.board;
    }

    getIsOver(): boolean {
        return this.isOver;
    }

    reset(): void {
        this.board = Array(3).fill('').map(() => Array(3).fill(''));
        this.isOver = false;
        this.currentPlayer = "X";
    }

    private switchPlayer(): void {
        if (this.isOver) return;
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }

    move(row: number, col: number): void {
        if (this.isOver) return;
        if (this.board[row][col] !== "" || this.isOver) return;
        this.board[row][col] = this.currentPlayer;
        this.isOver = this.checkForWinner();
        this.switchPlayer();
        if (this.playType === "bot") this.botMove();
    }
    botMove(): void {
        if (this.isOver) return;
        while (true) {
            const row = Math.floor(Math.random() * 3);
            const col = Math.floor(Math.random() * 3);
            if (this.board[row][col] === "") {
                this.board[row][col] = this.currentPlayer;
                this.isOver = this.checkForWinner();
                this.switchPlayer();
                break;
            }
        }
    }

    checkForWinner(): boolean {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i].every(cell => cell === this.currentPlayer)) return true;
            if (this.board.every(row => row[i] === this.currentPlayer)) return true;
        }

        if (this.board.every((row, idx) => row[idx] === this.currentPlayer)) return true;
        if (this.board.every((row, idx) => row[this.board.length - idx - 1] === this.currentPlayer)) return true;

        return false;
    }

    checkWinLine(): string|null {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i].every(cell => cell === this.currentPlayer)) return "row";
            if (this.board.every(row => row[i] === this.currentPlayer)) return "col";
        }
        if (this.board.every((row, idx) => row[idx] === this.currentPlayer)) return "rdiag";
        if (this.board.every((row, idx) => row[this.board.length - idx - 1] === this.currentPlayer)) return "diag";
        return null;
    }

    checkForDraw(): boolean {
        return !this.board.some(row => row.some(cell => cell === ""));
    }

    getWinner(): player | null {
        if (this.isOver && !this.checkForDraw()) return this.currentPlayer;
        return null;
    }
}