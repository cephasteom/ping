import { theWindow } from 'tone/build/esm/core/context/AudioContext'
import { context } from './setup-canvas'
class Barrier {
    constructor(col, row, size) {
        this.top = false
        this.left = false
        this.bottom = false
        this.right = false
        this.col = col
        this.row = row
        this.size = size
        this.getXY()
    }
    
    toggleLeft = () => this.left = !this.left
    toggleRight = () => this.right = !this.right
    toggleTop = () => this.top = !this.top
    toggleBottom = () => this.bottom = !this.bottom

    getXY() {
        this.x = this.col * this.size
        this.y = this.row * this.size
    }
    draw() {
        this.left && this.fillLeft()
        this.top && this.fillTop()
    }
    fillLeft() {
        context.beginPath()
        context.strokeStyle = 'white'
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.size);
        this.fill()
    }
    fillTop() {
        context.beginPath()
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