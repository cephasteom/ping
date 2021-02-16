import { output } from './setup-audio'
import * as Tone from 'tone'
class Block {
    constructor(i, direction, synth) {
        this.i = i
        this.direction = direction
        this.synth = synth
    }
    play(note, time) {
        this.synth.synth.triggerAttackRelease(note, "8n");
    }
}

export default Block;