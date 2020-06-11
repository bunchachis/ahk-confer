const render = arg => {
  return `OpenOrShowAppBasedOnAppModelUserID("${arg.title}", "${arg.appId}")`
}

export const openShowApp = {id: "open-show-app", name: "Run/show MS store app", render}