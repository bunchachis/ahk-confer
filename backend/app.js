import express from 'express'
import cors from 'cors'
import profilesRouter from './routes/profiles.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/profiles', profilesRouter)

app.listen(3010, '192.168.0.2', () => {
  console.log(`Listening to requests on http://localhost:3010`)
})

export default app