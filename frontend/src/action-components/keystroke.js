import React from 'react'
import {sendPatch} from '../shared/etc'

export default function keystrokeCmp({arg, setArg})
{
  return <div className="form-group">
    <label>Action: Text to send</label>
    <input className="form-control" value={arg && arg.string} onChange={sendPatch(setArg, 'string', arg)} />
  </div>
}