const render = arg => {
  return 'Send ' + ((arg && arg.string) || '')
}

export const keystroke = {id: "keystroke", name: "Send keystroke", render}