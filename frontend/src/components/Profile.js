import React, {useState} from 'react'
import {emptyRule} from './Rule'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faCog,
  faEye,
  faKeyboard, faList,
  faReply,
} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import ProfileSettings from './ProfileSettings'
import Button from 'reactstrap/lib/Button'
import AhkPreview from './AhkPreview'
import Editor from './Editor'
import useItem from '../useItem'
import ProfileLayouts from './ProfileLayouts'
import {v4} from 'uuid'
import {emptyProfile} from '../App'
import ProfileList from './ProfileList'

export default function Profile({value, setValue, loadProfile}) {
  const [profile, setProfile] = useState(value || emptyProfile)
  const {item: rule, setItem: setRule, ...ruleExtra} = useItem(
    profile.rules, rules => setProfile({...profile, rules}),
    emptyRule, (a, b) => a.id === b.id
  )

  if (!(profile && value && value.id === profile.id)) {
    ruleExtra.reset()
    setProfile(value)
  }

  const [picking, setPicking] = useState({active: false})
  if (picking.active && !rule.id) {
    setPicking({active: false})
  }

  const selectRule = ({id, mods, buttonId}) => {
    if (picking.active) {
      setPicking({active: true, mods, buttonId, ruleId: id})
    } else {
      const editing = ruleExtra.find({id}) || {...emptyRule, id: v4(), mods, buttonId, isDraft: true}
      setRule({...editing})
    }
  }

  const [view, setView] = useState("layouts")
  const profileChanged = !_.isEqual(profile, value)

  return <>
    <div className="profile column flex-grow-1">
      <div className="header">
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <h3><span className="text-secondary">Profile:</span> {profile.id}</h3>
          <div className="btn-group" role="group" aria-label="Basic example">
            <Button color="primary" outline active={view === "layouts"} onClick={() => setView("layouts")}><FontAwesomeIcon icon={faKeyboard} /> Layouts</Button>
            <Button color="primary" outline active={view === "list"} onClick={() => setView("list")}><FontAwesomeIcon icon={faList} /> Rules</Button>
            <Button color="primary" outline active={view === "preview"} onClick={() => setView("preview")}><FontAwesomeIcon icon={faEye} /> AHK Script</Button>
            <Button color="primary" outline active={view === "settings"} onClick={() => setView("settings")}><FontAwesomeIcon icon={faCog} /> Settings</Button>
          </div>
          <div>
            <button className="btn btn-outline-success" disabled={!profileChanged} onClick={() => setValue(profile)}>
              <FontAwesomeIcon icon={faCheck} /> {profileChanged ? "Save" : "Saved"}
            </button>
            <button className="btn btn-outline-secondary" onClick={() => loadProfile(profile.id)}>
              <FontAwesomeIcon icon={faReply} />
            </button>
          </div>
        </div>
      </div>
      {{
        layouts: <ProfileLayouts {...{profile, rule, selectRule, picking}} />,
        list: <ProfileList {...{profile, rule, selectRule, picking}} />,
        preview: <AhkPreview profile={profile} />,
        settings: <ProfileSettings version={profile.id} value={profile.settings} setValue={settings => setProfile({...profile, settings})} />,
      }[view]}
    </div>

    <Editor value={rule} setValue={value => ruleExtra.apply(value)} close={ruleExtra.reset} remove={ruleExtra.remove}
              picking={picking} setPicking={setPicking} />
    )
  </>
}