const render = arg => {
  return `Mordhau_Gesture("${arg.gesture || ''}")`
}

export const mordhauGesture = {id: "mordhau-gesture", name: "Mordhau: Gesture", render}