import { output } from './setup-audio'
import * as Tone from 'tone'
class Note {
    constructor(note) {
        this.note = note
        this.active = false
        this.gain = new Tone.Gain(0.25).connect(output)
        this.synth = new Tone.Synth({oscillator: {type: 'sine'}}).connect(this.gain)
    }
    play() {
        this.synth.triggerAttackRelease(this.note, "8n");
        this.reset()
    }
    reset() {
        this.active = false
    }
}

export default Note