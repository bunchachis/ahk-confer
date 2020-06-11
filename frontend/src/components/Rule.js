import React from 'react'
import {A, B, C, D, G} from '../shared/buttons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const emptyRule = {
  id: null,
  buttonId: null,
  mods: null,
  icon: null,
  label: "",
  actionId: "",
  actionArg: {},
}

const keyColors = {[A]: 'danger', [B]: 'warning', [C]: 'success', [D]: 'primary', [G]: 'dark'}

export default function Rule({rule, editing, select, small, lit, bold, color, disabled, fullsizeMod})
{
  const isEditing = editing.id && editing.id === rule.id
  const usedRule = rule
  const {id, mods, buttonId, label, icon} = {...emptyRule, ...usedRule}
  const isMod = !!keyColors[buttonId]
  const classes = ['btn', isMod ? (fullsizeMod ? '' : 'btn-sm ') + 'mod-btn' : 'rule-btn']
  const usedColor = color || keyColors[buttonId] || 'secondary'
  const opacity = isMod || usedRule.id || usedRule.label ? 1 : 0.20

  if (isEditing) {
    if (rule.isDraft) classes.push('draft')
    classes.push('active editing')
  }
  classes.push('btn-' + (lit ? '' : 'outline-') + usedColor)
  if (lit) classes.push('lit')
  if (small) classes.push('btn-sm')
  if (!isMod && !usedRule.id) classes.push('hover-icon')

  const content = icon ? <FontAwesomeIcon icon={icon} title={label} /> : label

  const handleClick = e => {
    e.preventDefault()
    select && select({id, mods, buttonId})
  }
  const boldness = bold ? {fontWeight: 'bold'} : {}

  return (
    <button className={classes.join(' ')} disabled={disabled} onClick={handleClick} style={{opacity, ...boldness}}>{content}</button>
  )
}