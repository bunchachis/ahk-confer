import {noop} from './noop.js'
import {custom} from './custom.js'
import {minimize} from './minimize.js'
import {keystroke} from './keystroke.js'
import {emulateKey} from './emulateKey.js'
import {openShowApp} from './openShowApp.js'
import {deezerVolume} from './deezerVolume.js'
import {mordhauVoice} from './mordhauVoice.js'
import {mordhauGesture} from './mordhauGesture.js'

const actions = [
  {id: "", name: "Don't react"},
  noop,
  custom,
  minimize,
  keystroke,
  emulateKey,
  openShowApp,
  deezerVolume,
  mordhauVoice,
  mordhauGesture,
]
export default actions