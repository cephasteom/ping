// TODO: if blocks arrive at the same time as each other - send out blocks in all directions!

import Board from './js/Board'
import * as Tone from 'tone'
import './styles/index.scss'


let board = new Board(9, 9)
// obstacles

document.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) board.setCursor(e.key)
    if(['n', 's', 'e', 'w'].includes(e.key)) board.createBlock(e.key)
});

// data and sound
Tone.Transport.scheduleRepeat((time) => {
    board.update()
}, "8n");

// visuals
Tone.Transport.scheduleRepeat((time) => {
    board.draw()
}, "32n");

Tone.Transport.start();