import * as Tone from 'tone'

const limiter = new Tone.Limiter(-10).toDestination()
export const output = new Tone.Reverb({
                                    "wet": 0.5,
                                    "decay": 10,
                                    "preDelay": 0.01
                                }).connect(limiter)