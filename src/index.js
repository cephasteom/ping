import Board from './js/Board'
import './styles/index.scss'

let board = new Board(10, 10)
let animationFrame

// key events to navigate around the grid
// 


const draw = () => {
    board.update()
    animationFrame = window.requestAnimationFrame(draw)
}

document.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) board.setCursor(e.key)
});

// const handleClickEvent = (e) => {
//     console.log('hello')
//     // if(!isAnimating) {
//     //     animationFrame = window.requestAnimationFrame(draw)
//     //     isAnimating = true
//     // }
// }
// document.getElementById('canvas').addEventListener('click', handleClickEvent)

draw()