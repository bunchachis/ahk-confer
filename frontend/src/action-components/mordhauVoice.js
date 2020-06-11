import React from 'react'
import Select from 'react-select'

const phrases = [
  "", "yes", "no", "help", "insult", "intimidate"
  , "sorry", "laugh", "thanks", "teammates", "get back"
  , "hold", "hello", "follow me", "respect", "charge",
]

export default function mordhauVoice({arg, setArg})
{
  return <>
    <div className="form-group">
      <label>Action: phrase</label>
      <Select options={phrases.map(phrase => ({value: phrase, label: phrase}))}
              value={{value: arg.phrase, label: arg.phrase}}
              onChange={sel => setArg({...arg, phrase: sel.value})}
              isClearable={false}
              styles={{control: styles => ({...styles, backgroundColor: '#e7e7e7', border: 'none', boxShadow: '0 1px 2px #00000020'})}} />
    </div>
  </>
}