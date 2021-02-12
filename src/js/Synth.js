import * as Tone from 'tone'
import { output } from './setup-audio'
class Synth {
    constructor() {
        this.init()
    }
    init() { 
        this.gain = new Tone.Gain(0.25).connect(output)
        this.synth = new Tone.FMSynth({oscillator: {type: 'sine'}, modulationIndex: 2}).connect(this.gain)
    }
    cleanUp() {
        this.synth.triggerRelease()
        setTimeout(() => {
            this.synth.dispose("+1")
            this.gain.dispose("+1")
        }, 2000)
    }
}

export default Synth;