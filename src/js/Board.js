import { context } from './setup-canvas'
import Square from './Square'

class Board {
    constructor(cols, rows) {
        this.cols = cols
        this.rows = rows
        this.size = 40
        this.cursor = 0
        this.squares = this.initSquares()
    }

    initSquares() {
        return new Array(this.cols * this.rows)
            .fill(null)
            .map((n, i) => new Square( 
                (i % this.cols), Math.floor(i / this.cols), 
                this.size, this.getSquareIndexFromColAndRow((i % this.cols), Math.floor(i / this.cols))
            ))
    }
    
    getSquareIndexFromColAndRow = (col, row) => (this.cols * row) + col
    
    drawBoard() {
        const { size, cols, rows } = this
        
        for (var x = 0; x <= cols; x++) {
            context.moveTo((x * size), 0);
            context.lineTo((x * size), rows * size);
        }
    
        for (var y = 0; y <= rows; y++) {
            context.moveTo(0, (y * size));
            context.lineTo(cols * size , (y * size));
        }
        context.strokeStyle = 'rgba(255,255,255,0.1)'
        context.stroke();
    }

    clearBoard() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }

    decrementRow = i => (this.squares.length + (i - this.cols)) % this.squares.length
    incrementRow = i => (i + this.cols) % this.squares.length
    decrementCol = i => (this.squares.length + (i - 1)) % this.squares.length
    incrementCol = i => (i + 1) % this.squares.length

    setCursor(key) {
        (key === 'ArrowUp' && (this.cursor = this.decrementRow(this.cursor))) ||
        (key === 'ArrowDown' && (this.cursor = this.incrementRow(this.cursor))) ||
        (key === 'ArrowLeft' && (this.cursor = this.decrementCol(this.cursor))) ||
        (key === 'ArrowRight' && (this.cursor = this.incrementCol(this.cursor)))
    }

    createBlock(direction) {
        this.squares[this.cursor].active = true
        this.squares[this.cursor].direction = direction
    }
    moveBlocks() {
        let newSquares = this.initSquares()
        
        for (let x = 0; x < this.squares.length; x++) {
            let square = this.squares[x]
            if(square.active) {
                let nextSquare
                let nextDirection
                switch(square.direction) {
                    case 'n':
                        nextSquare = square.row !== 0 ? square.i - this.cols : square.i + this.cols
                        nextSquare = this.squares[nextSquare].active ? square.i + this.cols : nextSquare
                        nextDirection = square.i > nextSquare ? 'n' : 's'
                        break;
                    case 's':
                        nextSquare = square.row !== this.rows - 1 ? square.i + this.cols : square.i - this.cols
                        nextSquare = this.squares[nextSquare].active ? square.i - this.cols : nextSquare
                        nextDirection = square.i > nextSquare ? 'n' : 's'
                        break;
                    case 'e':
                        nextSquare = square.col !== this.cols - 1 ? square.i + 1 : square.i - 1
                        nextSquare = this.squares[nextSquare].active ? square.i - 1 : nextSquare
                        nextDirection = square.i > nextSquare ? 'w' : 'e'
                        break;
                    case 'w':
                        nextSquare = square.col !== 0 ? square.i - 1 : square.i + 1
                        nextSquare = this.squares[nextSquare].active ? square.i + 1 : nextSquare
                        nextDirection = square.i > nextSquare ? 'w' : 'e'
                }
                newSquares[nextSquare].active = true
                newSquares[nextSquare].direction = nextDirection
            }
        }

        this.squares = newSquares
    }
    draw() {
        this.clearBoard()
        // this.drawBoard()
        this.squares[this.cursor].fillCursor()
        this.squares.forEach(square => square.active && square.fillBlock())
    }
    update() {
        this.moveBlocks()
    }
}

export default Board