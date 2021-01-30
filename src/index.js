// TODO: auto mode

// import { diffArray, medianArray, scale } from './js/utils'
import { context } from './js/setup-canvas'
import Board from './js/Board'
import './styles/index.scss'

let board = new Board(9, 8)
// Draw a 9 * 9 grid to start with 
// key events to navigate around the grid
// 


const draw = () => {
    animationFrame = window.requestAnimationFrame(draw)
}

const handleClickEvent = (e) => {
    console.log('hello')
    // if(!isAnimating) {
    //     animationFrame = window.requestAnimationFrame(draw)
    //     isAnimating = true
    // }
}
document.getElementById('canvas').addEventListener('click', handleClickEvent)
