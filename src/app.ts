import express from 'express'
import router from 'routes'

const app = express()

app
 .set('port', process.env.PORT)
 .use(express.json())
 .use(express.urlencoded({extended: false}))
 .use('/api/v1', router)

export default app
