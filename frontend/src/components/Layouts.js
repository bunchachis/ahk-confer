import React from 'react'
import {Scrollbars} from 'react-custom-scrollbars'
import {allMods} from '../shared/buttons'
import ButtonLayout from './ButtonLayout'
import _ from 'lodash'

export default function Layouts({rules, rule, picking, selectRule}) {
  const layouts = _.groupBy(rules.filter(r => r.buttonId), r => r.mods)

  const layoutsMods = allMods.filter(mods => layouts[mods])
  return (
    <div className="layouts flex-col" style={{marginRight: 30, width: 515}}>
      <h6 className="text-center" style={{marginBottom: 20}}>Layouts</h6>
      {layoutsMods.length ? (
        <div style={{flex: 1, margin: '0 -20px -30px'}}>
          <Scrollbars className="hover-bar">
            <div className="section-inner" style={{padding: '5px 20px 30px'}}>
              <div className="list">
                {layoutsMods.map(mods => (
                  <ButtonLayout key={mods} mods={mods} rules={layouts[mods]} editing={rule} select={selectRule} picking={picking} />
                ))}
              </div>
            </div>
          </Scrollbars>
        </div>
      ) : (
        <p className="text-center text-muted"><i>To make things happen you might use panel on the right.</i></p>
      )}
    </div>
  )
}