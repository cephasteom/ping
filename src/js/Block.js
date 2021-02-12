import { output } from './setup-audio'
import * as Tone from 'tone'
class Block {
    constructor(i, direction) {
        this.i = i
        this.direction = direction
        this.gain = new Tone.Gain(0.25).connect(output)
        this.synth = new Tone.FMSynth({oscillator: {type: 'sine'}}).connect(this.gain)
    }
    play(note, time) {
        // this.synth.triggerAttackRelease(note, "8n", time);
    }
}

export default Block;