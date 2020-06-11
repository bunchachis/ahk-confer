import Custom from './custom.js'
import Keystroke from './keystroke.js'
import EmulateKey from './emulateKey.js'
import DeezerVolume from './deezerVolume.js'
import OpenShowApp from './openShowApp.js'
import MordhauVoice from './mordhauVoice.js'
import MordhauGesture from './mordhauGesture.js'

const actionComponents = {
  custom: Custom,
  keystroke: Keystroke,
  "emulate-key": EmulateKey,
  "deezer-volume": DeezerVolume,
  "open-show-app": OpenShowApp,
  "mordhau-voice": MordhauVoice,
  "mordhau-gesture": MordhauGesture,
}
export default actionComponents