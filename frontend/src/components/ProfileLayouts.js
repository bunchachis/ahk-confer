import React from 'react'
import ModableButtonLayout from './ModableButtonLayout'
import Stash from './Stash'
import Layouts from './Layouts'

export default function ProfileLayouts({profile, rule, selectRule, picking}) {
  const rules = rule.isDraft
    ? profile.rules.concat([rule])
    : profile.rules.map(r => r.id === rule.id ? rule : r)


  return <div style={{display: 'flex', justifyContent: 'space-evenly', flex: 1}}>
    <Layouts {...{rules, rule, picking, selectRule}} />

    <div className="flex-col" style={{height: '100%'}}>
      <h6 className="text-center" style={{marginBottom: 25}}>Navigator</h6>
      <div className="viewer" style={{paddingBottom: 91}}>
        <ModableButtonLayout rules={rules} editing={rule} select={selectRule} onModsChange={() => null} picking={picking} />
      </div>

      <Stash {...{rules, rule, picking, selectRule}} />
    </div>
  </div>
}