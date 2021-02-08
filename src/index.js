// TODO: if blocks arrive at the same time as each other - send out blocks in all directions!

import Board from './js/Board'
import * as Tone from 'tone'
import './styles/index.scss'


let board = new Board(16, 16)
// obstacles

document.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) board.setCursor(e.key)
    if(['n', 's', 'e', 'w'].includes(e.key)) board.createBlock(e.key)
    if(['t', 'b', 'l', 'r'].includes(e.key)) board.createBarrier(e.key)
});

// data - calculate on every off 16th to give it time to calculate
const dataLoop = new Tone.Loop(() => {
    board.calculateBlocks()
}, "8n").start("16n");

// visuals / sound - draw on every 4th 
const eventLoop = new Tone.Loop(() => {
    board.draw()
}, "8n").start(0);

Tone.Transport.start();