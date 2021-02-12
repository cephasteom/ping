import * as Tone from 'tone'
import { output } from './setup-audio'
class Synth {
    constructor() {
        this.init()
    }
    init() { 
        this.gain = new Tone.Gain(0.25).connect(output)
        this.synth = new Tone.FMSynth({oscillator: {type: 'sine'}}).connect(this.gain)
    }
    cleanUp() {
        this.gain.dispose()
        this.synth.dispose()
    }
}

export default Synth;