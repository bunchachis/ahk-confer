import React from 'react'

export default function CustomCmp({arg, setArg})
{
  return <div className="form-group">
    <label>Action: AHK Code</label>
    <textarea className="form-control" value={arg && arg.string} onChange={e => setArg({...arg, string: e.target.value})} />
  </div>
}