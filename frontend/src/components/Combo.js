import React from 'react'
import Rule from './Rule'

export default function Combo({buttonIds}) {
  const isMod = buttonId => isNaN(parseInt(buttonId))
  return <div className="combo">
    {buttonIds.length === 0
      ? <i style={{lineHeight: '30px', display: 'block', textAlign: 'center', paddingLeft: 5, paddingRight: 5}}>не выбрано</i>
      : buttonIds.map(buttonId => (
        <Rule key={buttonId} rule={{buttonId, label: buttonId}} editing={{}} lit={isMod(buttonId)} bold={!isMod(buttonId)} color={!isMod(buttonId) && 'dark'} small disabled />
      ))}
  </div>
}