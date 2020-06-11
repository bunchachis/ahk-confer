import React from 'react'
import Combo from './Combo'
import {getButtonIds} from './Editor'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Scrollbars from 'react-custom-scrollbars'
import actions from '../shared/actions/actions'

const Item = ({rule}) => <li className="list-group-item row flex">
  <div className="col-4 text-right">
    <Combo buttonIds={getButtonIds(rule)}/>
  </div>
  <div className="col-8">
    <div>
      {rule.icon && <><FontAwesomeIcon icon={rule.icon}/>{' '}</>}
      {rule.label}
    </div>
    {rule.actionId && <p>{actions.find(a => a.id === rule.actionId).name}</p>}
  </div>
</li>

export default function ProfileList({profile, rule}) {
  const rules = rule.isDraft
    ? profile.rules.concat([rule])
    : profile.rules.map(r => r.id === rule.id ? rule : r)

  const stashRules = rules.filter(r => !r.buttonId)
  const boundRules = rules.filter(r => r.buttonId)
  return <div style={{flex: 1, marginBottom: -30}} className="flex-col">
    <Scrollbars style={{flex: 1}}>
      {boundRules.length + stashRules.length === 0 && <div>
        <p className="text-center text-muted"><i>There's no rules in this profile yet ;)</i></p>
      </div>}
      {boundRules.length > 0 && <>
        <h6 className="text-center" style={{marginBottom: 25}}>Bound</h6>
        <div className="list list-group" style={{maxWidth: 600, margin: '0 auto 30px'}}>
          {boundRules.map(r => <Item rule={r} />)}
        </div>
      </>}
      {stashRules.length > 0 && <>
        <h6 className="text-center" style={{marginBottom: 25}}>Stash</h6>
        <div className="list list-group" style={{maxWidth: 600, margin: '0 auto 30px'}}>
          {stashRules.map(r => <Item rule={r} />)}
        </div>
      </>}
    </Scrollbars>
  </div>
}