
class Block {
    constructor(i, direction, synth) {
        this.i = i
        this.direction = direction
        this.synth = synth
        this.hasCollided = false
    }
    play(note, transpose=false) {
        const octave = parseInt( note.split("").pop() ) + (transpose ? 1 : 0) 
        const letter = note[0]
        this.synth.play(letter, octave)
    }
    cleanUp = () => this.synth.synth.dispose()
}

export default Block;