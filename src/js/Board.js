import { context } from './setup-canvas'

class Board {
    constructor(cols, rows) {
        this.cols = cols
        this.rows = rows
        this.size = 40
        this.bw = 400
        this.bh = 400
        this.drawBoard()
    }
    drawBoard(){
        const { bw, bh, size, cols, rows } = this
        
        for (var x = 0; x <= cols; x++) {
            context.moveTo(0.5 + (x * size), 0);
            context.lineTo(0.5 + (x * size), rows * size);
        }
    
        for (var x = 0; x <= rows; x++) {
            context.moveTo(0, 0.5 + (x * size));
            context.lineTo(cols * size , 0.5 + (x * size));
        }
        context.strokeStyle = "white";
        context.stroke();
    }
}

export default Board