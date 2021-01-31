import { context } from './setup-canvas'
import Square from './Square'

class Board {
    constructor(cols, rows) {
        this.cols = cols
        this.rows = rows
        this.size = 40
        this.cursor = {col: 0, row: 0}
        this.initSquares()
        this.drawBoard()
    }
    initSquares() {
        this.squares = new Array(this.cols * this.rows)
            .fill(null)
            .map((n, i) => new Square(
                (i % this.cols),
                Math.floor(i / this.rows), // row
                this.size
            ))
    }
    drawBoard() {
        const { size, cols, rows } = this
        
        for (var x = 0; x <= cols; x++) {
            context.moveTo(0.5 + (x * size), 0);
            context.lineTo(0.5 + (x * size), rows * size);
        }
    
        for (var x = 0; x <= rows; x++) {
            context.moveTo(0, 0.5 + (x * size));
            context.lineTo(cols * size , 0.5 + (x * size));
        }
        context.strokeStyle = "white";
        context.stroke();
    }
    clearBoard() {
        const { size, cols, rows } = this
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
    setCursor(key) {
        switch(key) {
            case 'ArrowUp': this.cursor.row = (this.rows + (this.cursor.row - 1)) % this.rows
                break;
            case 'ArrowDown': this.cursor.row = (this.cursor.row + 1) % this.rows
                break;
            case 'ArrowLeft': this.cursor.col = (this.cols + (this.cursor.col - 1)) % this.cols
                break;
            case 'ArrowRight': this.cursor.col = (this.cursor.col + 1) % this.cols
        }
    }
    update() {
        this.clearBoard()
        this.drawBoard()
        this.squares[(this.rows * this.cursor.row) + this.cursor.col].fill()
    }

}

export default Board