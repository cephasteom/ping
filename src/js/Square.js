import { context } from './setup-canvas'
class Square {
    constructor(col, row, size, i) {
        this.col = col
        this.row = row
        this.size = size
        this.i = i
        this.active = false
        this.direction = null
        this.getXY()
    }
    getXY() {
        this.x = this.col * this.size
        this.y = this.row * this.size
    }
    fillCursor() {
        context.fillStyle = 'blue'
        this.fill()
    }
    fillBlock() {
        context.fillStyle = 'red'
        this.fill()
    }
    fill() {
        const { y, x, size } = this
        context.fillRect(x, y, size, size)
    }
}

export default Square