import React from 'react'
import Select from 'react-select'

const gestures = [
  "", "flourish", "rise", "greetings", "come on me", "throat cut", "honor",
  "facepalm", "sit", "scream", "hooray", "dance", "no", "idk", "indifferent", "roar",
  "drop", "surrender", "laugh", "point back", "over", "respect",
]

export default function mordhauGesture({arg, setArg})
{
  return <>
    <div className="form-group">
      <label>Action: gesture</label>
      <Select options={gestures.map(gesture => ({value: gesture, label: gesture}))}
              value={{value: arg.gesture, label: arg.gesture}}
              onChange={sel => setArg({...arg, gesture: sel.value})}
              isClearable={false}
              styles={{control: styles => ({...styles, backgroundColor: '#e7e7e7', border: 'none', boxShadow: '0 1px 2px #00000020'})}} />
    </div>
  </>
}