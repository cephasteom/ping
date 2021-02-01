// TODO: if blocks arrive at the same time as each other - send out blocks in all directions!

import Board from './js/Board'
import * as Tone from 'tone'
import './styles/index.scss'


let board = new Board(9, 9)
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
}, "16n");
Tone.Transport.start();