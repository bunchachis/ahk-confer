import React, {useState} from 'react'
import actions from '../shared/actions/actions'
import Combo from './Combo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons'
import IconPicker from './IconPicker'
import Select from 'react-select'
import _ from 'lodash'
import {emptyRule} from './Rule'
import FormGroup from './FormGroup'
import Button from 'reactstrap/lib/Button'
import actionComponents from '../action-components/actionComponents'

export const getButtonIds = ({mods, buttonId}) => (mods ? mods.split("") : []).concat([buttonId]).filter(id => !!id)

export default function Editor({value, setValue, remove, close, picking, setPicking}) {
  const [rule, setRule] = useState(value || emptyRule)

  if (!value.id) {
    return <div className="editor column" style={{background: '#f4f4f4', width: 400}}>
      <div className="header editor-header">
        <h3>Combo editor</h3>
      </div>
      <p><i className="text-muted">Click on any slot on the layout to edit associated rule or create a new one.</i></p>
    </div>
  }

  const updateRule = obj => setRule({...rule, ...obj})
  if (!(rule && value && rule.id === value.id)) {
    setRule(value)
  }

  const action = actions.find(a => a.id === rule.actionId)
  const save = () => {
    setValue(_.omit(rule, 'isDraft'))
  }

  if (picking.active && (picking.mods !== rule.mods || picking.buttonId !== rule.buttonId)) {
    updateRule({mods: picking.mods, buttonId: picking.buttonId})
    setPicking({active: false})
  }

  const areRulesEqual = (a, b) => {
    const keys = ['mods', 'buttonId', 'label', 'icon', 'actionId', 'actionArg']
    const filter = (value, key) => keys.includes(key)
    return _.isEqual(_.pickBy(a, filter), _.pickBy(b, filter))
  }
  const isChanged = rule.isDraft || (value && !areRulesEqual(rule, value))
  const ActionComponent = action.id && actionComponents[action.id]

  return <div className="editor column" style={{background: '#f4f4f4', width: 400}}>
    <div className="header editor-header">
      <h3>{rule.isDraft ? 'New' : 'Edit'} combo</h3>
      <div className="buttons">
        {!rule.isDraft && <button className="btn btn-outline-danger" onClick={() => remove()}><FontAwesomeIcon icon={faTrash} /></button>}
        <button className={"btn " + (isChanged ? "btn-success" : "btn-outline-success")} onClick={save} disabled={picking.active || !isChanged}>
          <FontAwesomeIcon icon={faCheck} /> {isChanged ? "Apply" : "OK"}
        </button>
        <button className="btn btn-outline-secondary" onClick={close}><FontAwesomeIcon icon={faTimes} /></button>
      </div>
    </div>

    <div className="form-group" style={{display: 'flex'}}>
      <IconPicker value={rule.icon} onChange={icon => updateRule({icon})} />
      <div className="compact-form" style={{marginLeft: 15, flexGrow: 1}}>
        <FormGroup label="Label" columns={[3, 9]}>
          <input className="form-control" value={rule.label} onChange={e => updateRule({label: e.target.value})} />
        </FormGroup>
        <FormGroup label="Combo" columns={[3, 9]}>
          {picking.active ? (
            <Button size="sm" outline color="info" style={{padding: 3}} onClick={() => setPicking({active: false})}>
              <span style={{lineHeight: '30px'}}>cancel</span>
            </Button>
          ) : (
            <div className="btn btn-sm btn-outline-secondary" style={{padding: 3}}
                 onClick={() => setPicking({active: true})}>
              <Combo buttonIds={getButtonIds(rule)} />
            </div>
          )}
        </FormGroup>
      </div>
    </div>

    <div className="form-group">
      <label>Action</label>
      <Select options={actions.map(({id, name}) => ({value: id, label: name}))}
              value={{value: rule.actionId, label: action.name}}
              onChange={e => updateRule({actionId: e.value})}
              isClearable={false}
              styles={{control: styles => ({...styles, backgroundColor: '#e7e7e7', border: 'none', boxShadow: '0 1px 2px #00000020'})}} />
    </div>

    {ActionComponent && <ActionComponent arg={rule.actionArg} setArg={actionArg => updateRule({actionArg})} />}

    <div className="form-group">
      <label>Action render</label>
      {!action.render ? <div><i className="text-muted">this action makes no rendering</i></div> : (
        <pre className="form-control" style={{height: 'auto'}}><code>
          {action.render(rule.actionArg || {}, rule)}
        </code></pre>
      )}
    </div>
  </div>
}