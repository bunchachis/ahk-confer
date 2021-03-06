import actions from './actions/actions.js'
import {ahkName, G} from './buttons.js'
import groupBy from 'lodash/groupBy.js'

const indent = (strs, depth = 1) => {
  let strsLeft = strs.split('\n').length
  return strs.split('\n').map(str => {
    --strsLeft;
    return str || strsLeft ? '\t'.repeat(depth) + str : ''
  }).join('\n')
}

const renderRule = rule => {
  const action = rule && rule.actionId && actions.find(a => a.id === rule.actionId)
  return action && action.render ? action.render(rule.actionArg, rule) : ''
}

const render = ({rules, settings}) => {
  let output = `;;; Auto generated by ahk-confer
#SingleInstance Force
#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
EnvGet, vUserProfile, USERPROFILE
SetWorkingDir  %vUserProfile%
#Include, %A_ScriptDir%  
#Include, ../lib.common.ahk

`
  if (settings.appName) {
    output += `#IfWinActive ${settings.appName}\n\n`
  }

  if (settings.customCode) {
    output += settings.customCode + '\n\n'
  }

  output += 'return ; main return\n\n'

  const renderButtonCode = (rules) => {
    const rule = rules[0]
    const buttonCode = ahkName(rule.buttonId)

    const getRuleCode = rule => {
      const povMods = rule.mods ? rule.mods.replace(G, "") : ""
      return (povMods ? `case "${povMods}":\n` : '') + indent(renderRule(rule), povMods ? 1 : 0)
    }

    const getSwitch = rules => {
      const ruleNoMods = rules.find(r => !r.mods.replace(G, ""))
      const rulesMods = rules.filter(r => r.mods.replace(G, ""))
      const codeMods = rulesMods.map(getRuleCode).join('\n')
      const codeNoMods = ruleNoMods ? getRuleCode(ruleNoMods) : ''

      return !codeMods ? (codeNoMods ? codeNoMods + '\n' : '')
        : 'switch GetPov()\n{\n' + indent(codeMods) + '\n' + (codeNoMods ? indent('default:\n' + indent(codeNoMods)) + '\n' : '') + `}\n`
    }

    const codeG = `${buttonCode}::\nif (IsG()) {\n` + indent(getSwitch(rules.filter(r => r.mods.includes(G)))) +`}`
    const codeNoG = getSwitch(rules.filter(r => !r.mods.includes(G)))
    return codeG + (codeNoG ? ' else {\n' + indent(codeNoG) + '}' : '') + '\nreturn'
  }

  output += Object.values(groupBy(rules.filter(rule => rule.buttonId && rule.actionId), rule => rule.buttonId))
    .map(renderButtonCode).join('\n\n')

  return output
}
export default render