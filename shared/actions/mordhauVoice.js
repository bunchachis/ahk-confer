const render = arg => {
  return `Mordhau_Voice("${arg.phrase || ''}")`
}

export const mordhauVoice = {id: "mordhau-voice", name: "Mordhau: Voice", render}