// TODO: auto mode

// import { diffArray, medianArray, scale } from './js/utils'
import { canvasCtx } from './js/setup-canvas'
import './styles/index.scss'



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
