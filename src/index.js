// TODO: if blocks arrive at the same time as each other - send out blocks in all directions!

// Blocks to their own array / type so that you don't have to iterate over all squares
// barriers become part of squares

import Board from './js/Board'
import * as Tone from 'tone'
import './styles/index.scss'

let board = new Board(15, 15, ["d", "e", "f", "a", "c"])

document.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) board.setCursor(e.key)
    if(['n', 's', 'e', 'w'].includes(e.key)) board.createBlock(e.key)
    if(['t', 'b', 'l', 'r'].includes(e.key)) board.createBarrier(e.key)
});

// data - calculate on every off 16th to give it time to calculate
new Tone.Loop(() => {
    board.calculateNextMoves()
}, "8n").start("16n");

// visuals / sound - draw on every 4th 

new Tone.Loop(() => {
    board.play()
    board.draw()
}, "8n").start(0);

Tone.Transport.start();