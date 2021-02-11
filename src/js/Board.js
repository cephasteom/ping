import { context } from './setup-canvas'
import Square from './Square'
import Note from './Note'
import Barrier from './Barrier'
import Block from './Block'

class Board {
    constructor(cols, rows, scale) {
        this.cols = cols
        this.rows = rows
        this.size = 20
        this.cursor = 0
        this.cursorStatic = 0
        this.squares = this.initSquares()
        this.barriers = this.initBarriers()
        this.notes = this.initNotes(scale)
        this.blocks = []
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
        this.blocks.push(new Block(this.cursor, direction))
        // this.squares[this.cursor].active = true
        // this.squares[this.cursor].direction = direction
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

    hasCollidedN = (i) => this.blocks.find(block => block.i === this.decrementRow(i)) || this.barriers[i].top
    hasCollidedS = (i) => this.blocks.find(block => block.i === this.incrementRow(i)) || this.barriers[i].bottom
    hasCollidedE = (i) => this.blocks.find(block => block.i === this.incrementCol(i)) || this.barriers[i].right
    hasCollidedW = (i) => this.blocks.find(block => block.i === this.decrementCol(i)) || this.barriers[i].left

    calculateEvents() {
        let newBlocks = []
        for (let x = 0; x < this.blocks.length; x++) {
            const { i, direction } = this.blocks[x]
            let nextI
            let nextDirection
            let hasCollided
            switch(direction) {
                case 'n':
                    hasCollided = this.hasCollidedN(i)
                    nextI = hasCollided ? this.incrementRow(i) : this.decrementRow(i)
                    nextDirection = hasCollided ? 's' : 'n'
                    break;
                case 's':
                    hasCollided = this.hasCollidedS(i)
                    nextI = hasCollided ? this.decrementRow(i) : this.incrementRow(i)
                    nextDirection = hasCollided ? 'n' : 's'
                    break;
                case 'e':
                    hasCollided = this.hasCollidedE(i)
                    nextI = hasCollided  ? this.decrementCol(i) : this.incrementCol(i)
                    nextDirection = hasCollided ? 'w' : 'e'
                    break;
                case 'w':
                    hasCollided = this.hasCollidedW(i)
                    nextI = hasCollided ? this.incrementCol(i) : this.decrementCol(i)
                    nextDirection = hasCollided ? 'e' : 'w'
            };
            newBlocks.push(new Block(nextI, nextDirection))
        }
        this.blocks = newBlocks
        this.cursorStatic++
    }

    draw() {
        this.clearBoard();
        this.drawBoard();
        this.cursorStatic < 5 && this.squares[this.cursor].fillCursor();
        this.blocks.forEach( ({i}) => this.squares[i].fillBlock())
    }

    // play() {
    //     for (let x = 0; x < this.squares.length; x++) {
    //         let square = this.squares[x]
    //         if(square.active) {
    //             let thisSquare = square.i
    //             let hasCollided
    //             switch(square.direction) {
    //                 case 'n':
    //                     hasCollided = this.hasCollidedN(thisSquare)
    //                     break;
    //                 case 's':
    //                     hasCollided = this.hasCollidedS(thisSquare)
    //                     break;
    //                 case 'e':
    //                     hasCollided = this.hasCollidedE(thisSquare)
    //                     break;
    //                 case 'w':
    //                     hasCollided = this.hasCollidedW(thisSquare)
    //             };
    //             (hasCollided && (this.notes[thisSquare].play()))
    //         }
    //     }
    // }
}

export default Board