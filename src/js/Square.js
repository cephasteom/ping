import { context } from './setup-canvas'
class Square {
    constructor(col, row, size, i, note) {
        this.col = col
        this.row = row
        this.size = size
        this.i = i
        this.note = note
        this.getXY()
    }
    getXY() {
        this.x = this.col * this.size
        this.y = this.row * this.size
    }
    clear() {
        context.fillStyle = 'black'
        this.fill()
    }
    fillBlock(colour = 'red') {
        context.fillStyle = colour
        this.fill()
    }
    fill() {
        const { y, x, size } = this
        context.fillRect(x + 1, y + 1, size - 2, size - 2)
    }
}

export default Square