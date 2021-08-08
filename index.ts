//Setting up config
require('dotenv').config({path: './config/.env'})
import app from 'app'
import connectDB from 'db/connect'
import log from 'utils/log.utils'

//Connect DB
connectDB()

app.listen(app.get('port'), () => {
 log.info(`Sever on port: ${app.get('port')} in ${process.env.NODE_ENV} mode`)
})
