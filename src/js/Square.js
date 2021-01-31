import { context } from './setup-canvas'
class Square {
    constructor(col, row, size) {
        this.col = col
        this.row = row
        this.size = size
    }
    fill() {
        const { col, row, size } = this
        context.fillStyle = 'blue'
        // context.fillStyle = 'rgba(255,255,255,0.25)'
        context.fillRect(col * size, row * size, size, size)
    }
}

export default Square