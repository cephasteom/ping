import * as Tone from 'tone'
import { output } from './setup-audio'
import { scale } from './utils'
class Synth {
    constructor() {
        this.init()
    }
    init() { 
        this.tremolo = new Tone.Tremolo(9, 0.75).connect(output)
        this.synth = new Tone.MonoSynth({
            oscillator: {type: 'sine'}, 
            envelope: {
                release: 2
            }
        }).connect(this.tremolo)
    }
    play(letter, octave) {
        this.synth.envelope.attack = scale(0, 6, 0.1, 0.01, octave)
        this.synth.envelope.release = scale(0, 6, 0.1, 1, octave)
        this.synth.volume.value = scale(0, 6, -10, -5, octave)
        this.synth.triggerAttackRelease(`${letter}${octave}`, "16n");
    }
}

export default Synth;