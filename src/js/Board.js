import { context } from './setup-canvas'
import Square from './Square'

class Board {
    constructor(cols, rows) {
        this.cols = cols
        this.rows = rows
        this.size = 40
        this.cursor = 10
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
        const { cursor, cols, rows, squares } = this
        let row = Math.floor(cursor / rows)
        switch(key) {
            case 'ArrowUp': this.cursor = (squares.length + (cursor - cols)) % squares.length
                break;
            case 'ArrowDown': this.cursor = (cursor + cols) % squares.length
                break;
            case 'ArrowLeft': this.cursor = ((cols + (cursor - 1)) % cols) + (row * rows) 
                break;
            case 'ArrowRight': this.cursor = ((cursor + 1) % cols) + (row * rows)
        }
    }
    update() {
        this.clearBoard()
        this.drawBoard()
        this.squares[this.cursor].fill()
    }

}

export default Board