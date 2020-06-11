import React, {useState} from 'react'
import {A, B, C, D, G} from '../shared/buttons'
import ButtonLayout from './ButtonLayout'

export default function ModableButtonLayout({rules, editing, select, onModsChange, picking}) {
  const defaultMods = {[A]: false, [B]: false, [C]: false, [D]: false, [G]: false}
  const [mods, setMods] = useState({...defaultMods})
  const serialize = mods => [G, A, B, C, D].filter(id => mods[id]).join("")
  const handleSelect = struct => {
    const {buttonId} = struct
    if (defaultMods[buttonId] != null) {
      setMods({...mods, [buttonId]: !mods[buttonId]})
      onModsChange(serialize(mods))
    } else {
      select(struct)
    }
  }

  return <ButtonLayout rules={rules.filter(r => r.mods === serialize(mods))} editing={editing} mods={serialize(mods)} select={handleSelect} enabledMods picking={picking} />
}