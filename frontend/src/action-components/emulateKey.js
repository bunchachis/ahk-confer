import React from 'react'

export default function emulateKeyCmp({arg, setArg})
{
  return <div className="form-group">
    <label>Action: Key to emulate</label>
    <input className="form-control" value={arg.button} onChange={e => setArg({button: e.target.value})} />
  </div>
}