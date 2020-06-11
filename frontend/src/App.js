import React, {useEffect, useState} from 'react'
import Profiles from './components/Profiles'
import Profile from './components/Profile'
import {profilesApi} from './api'

export const emptyProfile = {id: "", rules: [], settings: {}}

export default function App() {
  const [profiles, setProfiles] = useState([])
  const [profile, setProfile] = useState(emptyProfile)

  const api = profilesApi(setProfile, setProfiles)
  useEffect(() => api.loadList(), [null])

  return <>
    <Profiles {...{profiles, profile}} select={api.load} updateProfiles={api.loadList} deployProfile={api.deploy}
              createProfile={api.create} deleteProfile={api.remove} cloneProfile={api.clone} />

    {profile && profile.id
      ? <Profile value={profile} setValue={api.save} loadProfile={api.load} />
      : (
        <p className="text-muted text-center" style={{flex: 1, alignSelf: 'center'}}>
          <i>Choose an existing profile or <a href=" #" onClick={api.create}>create a new one</a></i>
        </p>
      )}
  </>
}
