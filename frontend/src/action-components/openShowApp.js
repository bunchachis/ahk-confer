import React from 'react'

export default function openShowAppCmp({arg, setArg})
{
  return <>
    <div className="form-group">
      <label>Action: Title</label>
      <input className="form-control" value={arg && arg.title} onChange={e => setArg({...arg, title: e.target.value})} />
    </div>
    <div className="form-group">
      <label>Action: App ID</label>
      <input className="form-control" value={arg && arg.appId} onChange={e => setArg({...arg, appId: e.target.value})} />
    </div>
  </>
}