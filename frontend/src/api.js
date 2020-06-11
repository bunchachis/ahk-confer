import * as axios from 'axios'
import {emptyProfile} from './App'

export const profilesApi = (setProfile, setProfiles) => {
  const apiUrl = "http://192.168.0.2:3010/profiles/"
  const loadList = () => axios.get(apiUrl).then(res => {
    setProfiles(res.data)
    return res.data
  })
  const load = id => axios.get(apiUrl + id).then(res => {
    setProfile(res.data)
    return res.data
  })
  const save = profile => {
    axios.put(apiUrl + profile.id, profile).then(res => {
      loadList()
      return res.data
    })
  }
  const create = () => {
    const id = prompt('ID of new profile (alphanumeric, with dashes)')
    if (id) {
      return axios.put(apiUrl + id).then(res => {
        setProfile(res.data)
        loadList()
        return res.data
      })
    }
  }
  const clone = id => {
    const cloneId = id + '-' + parseInt(Date.now() + '')
    const newId = prompt('ID of new profile (alphanumeric, with dashes)', cloneId) || cloneId
    if (newId) {
      return axios.post(apiUrl + id + '/clone/' + newId).then(res => {
        setProfile(res.data)
        loadList()
        return res.data
      })
    }
  }
  const remove = id => axios.delete(apiUrl + id).then(res => {
    res.data && setProfile(emptyProfile)
    loadList()
    return res.data
  })
  const deploy = (id, undeploy) => {
    axios.post(apiUrl + id + (undeploy ? '/undeploy' : '/deploy')).then(res => {
      loadList()
      return res.data
    })
  }

  return {loadList, load, save, create, clone, remove, deploy}
}