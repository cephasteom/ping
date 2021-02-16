import { scale } from './utils'
class Block {
    constructor(i, direction, synth) {
        this.i = i
        this.direction = direction
        this.synth = synth
    }
    play(note, transpose=false) {
        const octave = parseInt( note.split("").pop() ) + (transpose ? 1 : 0) 
        const nn = note[0]
        this.synth.synth.envelope.attack = scale(0, 6, 0.1, 0.5, octave)
        this.synth.synth.triggerAttackRelease(`${nn}${octave}`, "16n");
    }
}

export default Block;