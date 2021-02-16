import * as Tone from 'tone'
import { output } from './setup-audio'
class Synth {
    constructor() {
        this.init()
    }
    init() { 
        this.synth = new Tone.FMSynth({
            oscillator: {type: 'sine'}, 
            modulationIndex: 2
        }).connect(output)
        this.synth.volume.value = -5
    }
    cleanUp() {
        this.synth.triggerRelease()
        setTimeout(() => this.synth.dispose(), 2000)
    }
}

export default Synth;