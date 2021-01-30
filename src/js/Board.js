import { context } from './setup-canvas'

class Board {
    constructor() {
        this.bw = 400;
        this.bh = 400;
        this.p = 10;
        this.drawBoard()
    }
    drawBoard(){
        const { bw, bh, p } = this
        for (var x = 0; x <= bw; x += 40) {
            context.moveTo(0.5 + x + p, p);
            context.lineTo(0.5 + x + p, bh + p);
        }
    
        for (var x = 0; x <= bh; x += 40) {
            context.moveTo(p, 0.5 + x + p);
            context.lineTo(bw + p, 0.5 + x + p);
        }
        context.strokeStyle = "white";
        context.stroke();
    }
}

export default Board