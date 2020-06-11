const render = arg => {
  return `ModifyVolume(GetDeezerPid(), ${arg.delta})`
}

export const deezerVolume = {id: "deezer-volume", name: "Change Deezer volume", render}