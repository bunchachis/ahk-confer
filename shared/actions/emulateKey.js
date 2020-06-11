import {ahkName} from '../buttons.js'

const render = (arg, rule) => {
  return `Send {Blind}{${arg.button} Down}\n` +
    `KeyWait ${ahkName(rule.buttonId)} \n` +
    `Send {Blind}{${arg.button} Up}`
}

export const emulateKey = {id: "emulate-key", name: "Emulate a key", render}