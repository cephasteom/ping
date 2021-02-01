import Board from './js/Board'
import * as Tone from 'tone'
import './styles/index.scss'


let board = new Board(6, 10)
let animationFrame


// moving blocks
// obstacles

// handle visual
const draw = () => {
    board.draw()
    animationFrame = window.requestAnimationFrame(draw)
}


document.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) board.setCursor(e.key)
    if(['n', 's', 'e', 'w'].includes(e.key)) board.createBlock(e.key)
});

draw()

Tone.Transport.scheduleRepeat((time) => {
    board.update()
}, "4n");
Tone.Transport.start();