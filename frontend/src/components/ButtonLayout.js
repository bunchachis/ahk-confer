import React from 'react'
import Rule from './Rule'
import {B1, B2, B3, B4, B5, B6, B7, B8, B9, B0, onlyMods, forbiddenMods} from '../shared/buttons'

export default function ButtonLayout({mods, rules, editing, select, disabled, enabledMods, picking}) {
  const buttonLayout = [[B1, B2, B3, B4, B5], [B6, B7, B8, B9, B0], onlyMods]
  const buttonExtraLayout = [["L", "M", "R"], ["X", "N", "T"], ["Y", "S"]]

  const renderRow = row => <tr key={row[0]}>
    {row.map(buttonId => {
      const isMod = onlyMods.includes(buttonId)
      const forbiddenMod = isMod && forbiddenMods[buttonId] && mods.includes(forbiddenMods[buttonId])

      const found = rules.find(r => r.buttonId === buttonId)

      const rule = found ? {...found} : {mods, buttonId, isDraft: true}
      rule.label = isMod ? ((enabledMods || mods.includes(buttonId)) && !forbiddenMod ? buttonId : " ") : (rule.label || null)
      rule.icon = isMod || rule.id ? rule.icon : (picking.active ? 'sign-in-alt' : 'plus')

      const lit = mods.includes(buttonId)
      const btnDisabled = disabled || (isMod && !enabledMods) || forbiddenMod

      return <td key={buttonId}>
        <Rule rule={rule} lit={lit} disabled={btnDisabled}
              editing={editing}
              select={select} fullsizeMod={enabledMods} />
      </td>
    })}
  </tr>

  return (
    <div className="keypad">
      <table>
        <tbody>
          {buttonLayout.map(renderRow)}
        </tbody>
      </table>
      <table className="suffix">
        <tbody>
          {buttonExtraLayout.map(renderRow)}
        </tbody>
      </table>
    </div>
  )
}