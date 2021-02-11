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
        this.right && this.fillRight()
        this.bottom && this.fillBottom()
    }
    fillLeft() {
        context.beginPath()
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.size);
        this.fill()
    }
    fillRight() {
        context.beginPath()
        context.moveTo(this.x + this.size, this.y);
        context.lineTo(this.x + this.size, this.y + this.size);
        this.fill()
    }
    fillTop() {
        context.beginPath()
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.size, this.y);
        this.fill()
    }
    fillBottom() {
        context.beginPath()
        context.moveTo(this.x, this.y + this.size);
        context.lineTo(this.x + this.size, this.y + this.size);
        this.fill()
    }
    fill() {
        context.strokeStyle = 'white'
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