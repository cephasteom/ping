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
    decrementCol = i => (this.squares.length + (i - 1)) % this.cols + (Math.floor(i / this.cols) * this.cols)
    incrementCol = i => (i + 1) % this.cols + (Math.floor(i / this.cols) * this.cols)

    setCursor(key) {
        this.cursor = (key === 'ArrowUp' && this.decrementRow(this.cursor)) ||
                    (key === 'ArrowDown' && this.incrementRow(this.cursor)) ||
                    (key === 'ArrowLeft' && this.decrementCol(this.cursor)) ||
                    (key === 'ArrowRight' && this.incrementCol(this.cursor))
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
                        nextSquare = !this.squares[this.decrementRow(square.i)].active ? this.decrementRow(square.i) : this.incrementRow(square.i)
                        nextDirection = !this.squares[this.decrementRow(square.i)].active ? 'n' : 's'
                        break;
                    case 's':
                        nextSquare = !this.squares[this.incrementRow(square.i)].active ? this.incrementRow(square.i) : this.decrementRow(square.i)
                        nextDirection = !this.squares[this.incrementRow(square.i)].active ? 's' : 'n'
                        break;
                    case 'e':
                        nextSquare = !this.squares[this.incrementCol(square.i)].active ? this.incrementCol(square.i) : this.decrementCol(square.i)
                        nextDirection = !this.squares[this.incrementCol(square.i)].active ? 'e' : 'w'
                        break;
                    case 'w':
                        nextSquare = !this.squares[this.decrementCol(square.i)].active ? this.decrementCol(square.i) : this.incrementCol(square.i)
                        nextDirection = !this.squares[this.decrementCol(square.i)].active ? 'w' : 'e'
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