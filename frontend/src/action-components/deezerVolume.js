import React from 'react'

export default function deezerVolumeCmp({arg, setArg})
{
  return <div className="form-group">
    <label>Action: Volume delta</label>
    <input className="form-control" value={arg.delta} onChange={e => setArg({delta: e.target.value})} />
  </div>
}