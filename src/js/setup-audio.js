import * as Tone from 'tone'

const limiter = new Tone.Limiter(0).toDestination()
export const output = new Tone.Reverb({
                                    "wet": 1,
                                    "decay": 2,
                                    "preDelay": 0.01
                                }).connect(limiter)