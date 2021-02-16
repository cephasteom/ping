import Board from './js/Board'
import * as Tone from 'tone'
import './styles/index.scss'

let board = new Board(["d2", "a2", "d3", "e3", "f3", "a3", "c4", "d4", "e4", "f5", "a5", "b5"])
let audioIsRunning = false

document.addEventListener('keydown', async () => {
    if(audioIsRunning) return
	await Tone.start()
    audioIsRunning = true
    Tone.Transport.start();
})
document.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) board.setCursor(e.key)
    if(['n', 's', 'e', 'w'].includes(e.key)) board.createBlock(e.key)
    if(['t', 'b', 'l', 'r'].includes(e.key)) board.createBarrier(e.key)
});

new Tone.Loop(time => {
    board.clearBoard()
    board.drawBlocks(time)
    board.playAndMoveBlocks(time)
    board.drawBoard()
}, "8n").start(0);