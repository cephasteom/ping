import { context } from './setup-canvas'
import Square from './Square'
import Barrier from './Barrier'

class Board {
    constructor(cols, rows) {
        this.cols = cols
        this.rows = rows
        this.size = 40
        this.cursor = 0
        this.squares = this.initSquares()
        this.barriers = this.initBarriers()
    }

    initSquares() {
        return new Array(this.cols * this.rows)
            .fill(null)
            .map((n, i) => new Square( 
                (i % this.cols), Math.floor(i / this.cols), 
                this.size, this.getSquareIndexFromColAndRow((i % this.cols), Math.floor(i / this.cols))
            ))
    }

    initBarriers() {
        return new Array(this.cols * this.rows)
            .fill(null)
            .map((n, i) => new Barrier((i % this.cols), Math.floor(i / this.cols), this.size))
    }
    
    getSquareIndexFromColAndRow = (col, row) => (this.cols * row) + col
    
    drawBoard() {
        for (var x = 0; x < this.barriers.length; x++) {
            this.barriers[x].draw()
        }
    }

    clearBoard() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }

    decrementRow = i => (this.squares.length + (i - this.cols)) % this.squares.length
    incrementRow = i => (i + this.cols) % this.squares.length
    decrementCol = i => (this.squares.length + (i - 1)) % this.cols + (Math.floor(i / this.cols) * this.cols)
    incrementCol = i => (i + 1) % this.cols + (Math.floor(i / this.cols) * this.cols)

    setCursor(key) {
        this.squares[this.cursor].clearCursor();
        (key === 'ArrowUp' && (this.cursor = this.decrementRow(this.cursor))) ||
        (key === 'ArrowDown' && (this.cursor = this.incrementRow(this.cursor))) ||
        (key === 'ArrowLeft' && (this.cursor = this.decrementCol(this.cursor))) ||
        (key === 'ArrowRight' && (this.cursor = this.incrementCol(this.cursor)))
        this.squares[this.cursor].fillCursor()
    }

    createBlock(direction) {
        this.squares[this.cursor].active = true
        this.squares[this.cursor].direction = direction
    }

    createBarrier(side) {
        (side === 'l' && (this.barriers[this.cursor].left = !this.barriers[this.cursor].left)) ||
        (side === 'r' && (this.barriers[this.incrementCol(this.cursor)].left = !this.barriers[this.incrementCol(this.cursor)].left)) ||
        (side === 't' && (this.barriers[this.cursor].top = !this.barriers[this.cursor].top)) ||
        (side === 'b' && (this.barriers[this.incrementRow(this.cursor)].top = !this.barriers[this.incrementRow(this.cursor)].top))
        // copy l and t data to r and l
        console.log(this.barriers)
        // let newBarriers = this.initBarriers()
        // this.barriers.forEach((barrier, i) => {
        //     newBarriers[i].left = barrier.left
        //     newBarriers[i].top = barrier.top
        //     newBarriers[this.decrementCol(i)].right = barrier.left
        //     newBarriers[this.decrementRow(i)].bottom = barrier.top
        // })
        // this.barriers = newBarriers

    }

    calculateBlocks() {
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
        this.drawBoard()
        this.squares[this.cursor].fillCursor()
        this.squares.forEach(square => square.active && square.fillBlock())
    }
}

export default Board