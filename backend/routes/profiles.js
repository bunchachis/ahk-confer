import render from '../../shared/render.js'
import express from 'express'
const router = express.Router()
import fs from 'fs'
import {spawn} from 'child_process'

router.get('/', (req, res) => {
  fs.readdir('saves', (err, files) => {
    if (err) {
      res.json(null)
    } else {
      const profiles = []
      files.map(filename => {
        if (filename.endsWith('.json')) {
          const {id, settings} = JSON.parse(fs.readFileSync(`saves/${filename}`).toString())
          const isDeployed = fs.existsSync(deployPath + id + '.ahk')
          profiles.push({id, settings, isDeployed})
        }
      })
      res.json(profiles)
    }
  })
})

router.get('/:id', (req, res) => {
  fs.readFile(`saves/${req.params.id}.json`, (err, data) => {
    if (err) {
      res.json(null)
    } else {
      const struct = JSON.parse(data)
      res.json(struct)
    }
  })
})

router.put('/:id', (req, res) => {
  const profile = req.body.id ? req.body : {id: req.params.id, rules: [], settings: {}}
  fs.writeFile(`saves/${req.params.id}.json`, JSON.stringify(profile), err => {
    if (err) {
      res.json(null)
    } else {
      res.json(profile)
    }
  })
})

router.delete('/:id', (req, res) => {
  fs.rename(`saves/${req.params.id}.json`, `trash/${(new Date()).toISOString().replace(/[^0-9]/g, '-',)}${req.params.id}.json`, err => {
    if (err) {
      res.json(null)
    } else {
      res.json(true)
    }
  })
})

router.post('/:id/clone/:newId', (req, res) => {
  fs.readFile(`saves/${req.params.id}.json`, (err, data) => {
    if (err) {
      res.json(null)
    } else {
      const profile = JSON.parse(data)
      profile.id = req.params.newId
      fs.writeFile(`saves/${profile.id}.json`, JSON.stringify(profile), err => {
        if (err) {
          res.json(null)
        } else {
          res.json(profile)
        }
      })
    }
  })
})

const deployPath = "C:\\Users\\buncha\\utils\\ahk\\ahk-confer\\"
router.post('/:id/deploy', (req, res) => {
  const id = req.params.id
  fs.readFile(`saves/${id}.json`, (err, data) => {
    if (err) res.json(null)
    else {
      const profile = JSON.parse(data)
      const code = render(profile)
      fs.writeFile(deployPath + id + '.ahk', code, err => {
        res.json(err ? null : true)
        spawn('C:\\Program Files\\AutoHotkey\\Autohotkey.exe', [deployPath + id + '.ahk'])
      })
    }
  })
})
router.post('/:id/undeploy', (req, res) => {
  fs.unlink(deployPath + req.params.id + '.ahk', err => {
    res.json(err ? null : true)
  })
})

export default router
