import { context } from './setup-canvas'
import Square from './Square'
import Note from './Note'
import Barrier from './Barrier'
import Block from './Block'

class Board {
    constructor(scale) {
        this.scale = scale
        this.cols = scale.length
        this.rows = scale.length
        this.size = 20
        this.cursor = 0
        this.cursorStatic = 0
        this.squares = this.initSquares()
        this.barriers = this.initBarriers()
        this.notes = this.initNotes()
        this.blocks = []
        this.duplicates = [] // when blocks arrive at the same square together
    }

    initNotes() {
        let notes = new Array(this.cols * this.rows).fill(null)
        for(let i = 0; i < notes.length; i++) {
            notes[i] = new Note(this.scale[(i % this.cols)])
        }
        return notes
            


        // const singleRow = new Array(this.cols).fill(null)
        //     .map((n, i) => `${scale[i % scale.length]}${Math.floor((i % this.cols) / scale.length) + 3}`)

        // return new Array(this.cols * this.rows).fill(null)
        //     .map((n, i) => new Note(singleRow[ i % this.cols ]))
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

    clear() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }

    decrementRow = i => (this.squares.length + (i - this.cols)) % this.squares.length
    incrementRow = i => (i + this.cols) % this.squares.length
    decrementCol = i => (this.squares.length + (i - 1)) % this.cols + (Math.floor(i / this.cols) * this.cols)
    incrementCol = i => (i + 1) % this.cols + (Math.floor(i / this.cols) * this.cols)

    setCursor(key) {
        this.squares[this.cursor].clear();
        (key === 'ArrowUp' && (this.cursor = this.decrementRow(this.cursor))) ||
        (key === 'ArrowDown' && (this.cursor = this.incrementRow(this.cursor))) ||
        (key === 'ArrowLeft' && (this.cursor = this.decrementCol(this.cursor))) ||
        (key === 'ArrowRight' && (this.cursor = this.incrementCol(this.cursor)))
        this.squares[this.cursor].fillBlock('blue')
        this.cursorStatic = 0
    }

    createBlock(direction) {
        this.blocks.push(new Block(this.cursor, direction))
    }

    setBarrierL(i) {
        this.barriers[i].toggleLeft()
        this.barriers[this.decrementCol(i)].toggleRight()
    }

    setBarrierT(i) {
        this.barriers[i].toggleTop()
        this.barriers[this.decrementRow(i)].toggleBottom()
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

    calculateNextMoves() {
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
            let duplicate = newBlocks.find(block => block.i === nextI)
            duplicate ? 
                (newBlocks = newBlocks.filter(block => block !== duplicate)) && this.duplicates.push(duplicate.i)
                : 
                newBlocks.push(new Block(nextI, nextDirection));
            
        }
        this.blocks = newBlocks
        this.cursorStatic++
    }

    draw() {
        this.clear();
        this.drawBoard();
        this.cursorStatic < 5 && this.squares[this.cursor].fillBlock('blue');
        this.blocks.forEach( ({i}) => this.squares[i].fillBlock());
        this.duplicates.forEach( i => this.squares[i].fillBlock('purple'))
        this.duplicates = []
    }

    // TODO: move synth into blocks
    play() {
        for (let x = 0; x < this.blocks.length; x++) {
            const { i, direction } = this.blocks[x];
            (direction === 'n' && this.hasCollidedN(i) ||
            direction === 's' && this.hasCollidedS(i) ||
            direction === 'e' && this.hasCollidedE(i) ||
            direction === 'w' && this.hasCollidedW(i)) && this.notes[i].play()
        }
    }
}

export default Board