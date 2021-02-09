import { output } from './setup-audio'
import * as Tone from 'tone'
class Note {
    constructor(note) {
        this.note = note
        this.active = false
    }
    play() {
        console.log(this.note)
        const synth = new Tone.Synth({oscillator: {type: 'sine'}}).connect(output);
        synth.triggerAttackRelease(this.note, "8n");
        this.reset()
    }
    reset() {
        this.active = false
    }
}

export default Note