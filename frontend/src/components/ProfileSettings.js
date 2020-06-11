import React, {useState} from 'react'
import {Button} from 'reactstrap'
import Editor from 'react-simple-code-editor'
import {highlight, languages} from 'prismjs/components/prism-core'
import 'prismjs/components/prism-autohotkey'
import {sendPatch} from '../shared/etc'
import {Scrollbars} from 'react-custom-scrollbars'

export default function ProfileSettings({version, value, setValue}) {
  const [usedVersion, setUsedVersion] = useState(version)
  const [model, setModel] = useState(value)
  if (usedVersion !== version) {
    setModel(value)
    setUsedVersion(version)
  }
  const update = patch => setModel({...model, ...patch})

  return <div style={{flexGrow: 1, margin: '0 -20px'}}>
    <Scrollbars className="hover-bar">
      <div style={{padding: '0 20px'}}>
        <div className="form-group">
          <label>Profile name</label>
          <input className="form-control" value={model.name} onChange={sendPatch(update, "name")} />
        </div>
        <div className="form-group">
          <label>Target program name</label>
          <input className="form-control" value={model.appName} onChange={sendPatch(update, "appName")} />
        </div>
        <div className="form-group">
          <label>Custom scriptlet</label>
          <Editor
            className="form-control code-editor"
            value={model.customCode || ''}
            onValueChange={customCode => update({customCode})}
            highlight={code => highlight(code, languages.autohotkey)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              height: 'auto',
            }}
          />
        </div>
        <Button color="success" onClick={() => setValue(model)}>Apply</Button>
      </div>
    </Scrollbars>
  </div>
}
