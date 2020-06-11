import React from 'react'
import Rule, {emptyRule} from './Rule'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import {Scrollbars} from 'react-custom-scrollbars'

export default function Stash({rules, rule, picking, selectRule}) {
  const stashRules = rules.filter(r => !r.buttonId)

  return (
    <div className="stash flex-col" style={{flex: 1, width: 515}}>
      <h6 className="text-center" style={{marginBottom: 20}}>Stash</h6>
      <div style={{flex: 1, margin: '0 -20px -30px'}}>
        <Scrollbars className="hover-bar">
          <div className="section-inner list" style={{padding: '5px 15px 30px 15px'}}>
            <button className="btn btn-outline-secondary rule-btn" style={{opacity: 0.2}}
                    onClick={() => selectRule(emptyRule)}>
              <FontAwesomeIcon icon={picking.active ? faSignInAlt : faPlus} style={{fontSize: 35}} />
            </button>
            {stashRules.reverse().map(r => (
              <Rule key={r.id} rule={r} editing={rule} select={selectRule} />
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}