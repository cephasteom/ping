
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
}

export default Barrier