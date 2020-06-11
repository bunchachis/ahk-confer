import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCopy, faPlay, faSync, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Button} from 'reactstrap'

export default function Profiles({profiles, profile, select, createProfile, deleteProfile, cloneProfile, updateProfiles, deployProfile}) {
  return <div className="profiles column" style={{background: '#f4f4f4', width: 350}}>
    <div className="header">
      <h3>Profiles</h3>
      <div className="header-buttons">
        <Button outline color="secondary" onClick={() => updateProfiles()}><FontAwesomeIcon icon={faSync} /></Button>
        <Button outline color="primary" onClick={() => createProfile()}>New</Button>
      </div>
    </div>
    <div className="list list-group list-group-flush" style={{margin: '0 -30px'}}>
      {profiles.map(p => (
        <a key={p.id} href=" #" className={`list-group-item list-group-item-secondary list-group-item-action flex-column align-items-start ${profile && p.id === profile.id && "active"}`}
                onClick={e => (e.preventDefault() + select(p.id))}>
          <div className="overflow-hidden">
            <div className="item-buttons" onClick={e => e.stopPropagation()}>
              <Button size="sm" outline color="danger" onClick={() => deleteProfile(p.id)}><FontAwesomeIcon icon={faTrash} /></Button>
              <Button size="sm" outline color="dark" onClick={() => cloneProfile(p.id)}><FontAwesomeIcon icon={faCopy} /></Button>
              <Button size="sm" outline active={p.isDeployed} color="success" onClick={() => deployProfile(p.id, p.isDeployed)}><FontAwesomeIcon icon={faPlay} /></Button>
            </div>
            <h5>{p.id}</h5>
          </div>
          {p.settings.name && <div className="mt-2">
            <small>{p.settings.name}</small>
          </div>}
        </a>
      ))}
    </div>
  </div>
}