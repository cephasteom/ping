import * as Tone from 'tone'
import { output } from './setup-audio'
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
    cleanUp() {
        this.synth.triggerRelease()
        setTimeout(() => this.synth.dispose(), 2000)
    }
}

export default Synth;