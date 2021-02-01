import { context } from './setup-canvas'
class Barrier {
    constructor(col, row, size) {
        this.top = false
        this.left = false
        this.col = col
        this.row = row
        this.size = size
        this.getXY()
    }
    getXY() {
        this.x = this.col * this.size
        this.y = this.row * this.size
    }
    fillLeft() {
        context.strokeStyle = 'white'
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.size);
        this.fill()
    }
    fillTop() {
        context.strokeStyle = 'white'
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.size, this.y);
        this.fill()
    }
    fill() {
        context.stroke()
    }
    clearLeft() {
        context.strokeStyle = 'black'
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.size);
        this.fill()
    }
    clearTop() {
        context.strokeStyle = 'black'
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.size, this.y);
        this.fill()
    }
}

export default Barrier