import { context } from './setup-canvas'
import Square from './Square'
import Note from './Note'
import Barrier from './Barrier'

class Board {
    constructor(cols, rows, scale) {
        this.cols = cols
        this.rows = rows
        this.size = 20
        this.cursor = 0
        this.cursorStatic = 0
        this.squares = this.initSquares()
        this.barriers = this.initBarriers()
        this.synths = []
        this.notes = this.initNotes(scale)
    }

    initNotes(scale) {
        const singleRow = new Array(this.cols).fill(null)
            .map((n, i) => `${scale[i % scale.length]}${Math.floor((i % this.cols) / scale.length) + 3}`)

        return new Array(this.cols * this.rows).fill(null)
            .map((n, i) => new Note(singleRow[ i % this.cols ]))
    }

    initSquares() {
        return new Array(this.cols * this.rows)
            .fill(null)
            .map((n, i) => new Square( 
                (i % this.cols), Math.floor(i / this.cols), 
                this.size, this.getSquareIndex((i % this.cols), Math.floor(i / this.cols))
            ))
    }

    initBarriers() {
        return new Array(this.cols * this.rows)
            .fill(null)
            .map((n, i) => new Barrier((i % this.cols), Math.floor(i / this.cols), this.size))
    }
    
    getSquareIndex = (col, row) => (this.cols * row) + col
    
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
        this.cursorStatic = 0
    }

    createBlock(direction) {
        this.squares[this.cursor].active = true
        this.squares[this.cursor].direction = direction
    }

    setBarrierL(i) {
        this.barriers[i].left = !this.barriers[i].left
        this.barriers[this.decrementCol(i)].right = this.barriers[i].left
    }

    setBarrierT(i) {
        this.barriers[i].top = !this.barriers[i].top
        this.barriers[this.decrementRow(i)].bottom = this.barriers[i].top
    }

    createBarrier(side) {
        (side === 'l' && (this.setBarrierL(this.cursor))) ||
        (side === 'r' && (this.setBarrierL(this.incrementCol(this.cursor)))) ||
        (side === 't' && (this.setBarrierT(this.cursor))) ||
        (side === 'b' && (this.setBarrierT(this.incrementRow(this.cursor))))
    }

    hasCollidedN = (i) => this.squares[this.decrementRow(i)].active || this.barriers[i].top
    hasCollidedS = (i) => this.squares[this.incrementRow(i)].active || this.barriers[i].bottom
    hasCollidedE = (i) => this.squares[this.incrementCol(i)].active || this.barriers[i].right
    hasCollidedW = (i) => this.squares[this.decrementCol(i)].active || this.barriers[i].left

    calculateEvents() {
        let newSquares = this.initSquares()
        
        for (let x = 0; x < this.squares.length; x++) {
            let square = this.squares[x]
            if(square.active) {
                let thisSquare = square.i
                let nextSquare
                let nextDirection
                let hasCollided
                switch(square.direction) {
                    case 'n':
                        hasCollided = this.hasCollidedN(thisSquare)
                        nextSquare = hasCollided ? this.incrementRow(thisSquare) : this.decrementRow(thisSquare)
                        nextDirection = hasCollided ? 's' : 'n'
                        break;
                    case 's':
                        hasCollided = this.hasCollidedS(thisSquare)
                        nextSquare = hasCollided ? this.decrementRow(square.i) : this.incrementRow(square.i)
                        nextDirection = hasCollided ? 'n' : 's'
                        break;
                    case 'e':
                        hasCollided = this.hasCollidedE(thisSquare)
                        nextSquare = hasCollided  ? this.decrementCol(square.i) : this.incrementCol(square.i)
                        nextDirection = hasCollided ? 'w' : 'e'
                        break;
                    case 'w':
                        hasCollided = this.hasCollidedW(thisSquare)
                        nextSquare = hasCollided ? this.incrementCol(square.i) : this.decrementCol(square.i)
                        nextDirection = hasCollided ? 'e' : 'w'
                };
                newSquares[nextSquare].active = true
                newSquares[nextSquare].direction = nextDirection
            }
        }

        this.squares = newSquares
        this.cursorStatic++
    }

    draw() {
        this.clearBoard();
        this.drawBoard();
        this.cursorStatic < 5 && this.squares[this.cursor].fillCursor();
        this.squares.forEach(square => square.active && square.fillBlock())
    }

    play() {
        for (let x = 0; x < this.squares.length; x++) {
            let square = this.squares[x]
            if(square.active) {
                let thisSquare = square.i
                let hasCollided
                switch(square.direction) {
                    case 'n':
                        hasCollided = this.hasCollidedN(thisSquare)
                        break;
                    case 's':
                        hasCollided = this.hasCollidedS(thisSquare)
                        break;
                    case 'e':
                        hasCollided = this.hasCollidedE(thisSquare)
                        break;
                    case 'w':
                        hasCollided = this.hasCollidedW(thisSquare)
                };
                (hasCollided && (this.notes[thisSquare].play()))
            }
        }
    }
}

export default Board