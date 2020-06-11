import React from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-autohotkey'
import render from '../shared/render'
import {Scrollbars} from 'react-custom-scrollbars'

export default function AhkPreview({profile}) {
  return <div style={{flexGrow: 1}}>
    <Scrollbars className="hover-bar">
        <Editor
          className="section-inner code-editor"
          value={render(profile)}
          onValueChange={() => null}
          highlight={code => highlight(code, languages.autohotkey)}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
          }}
        />
    </Scrollbars>
  </div>
}