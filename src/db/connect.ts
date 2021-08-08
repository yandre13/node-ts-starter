import mongoose from 'mongoose'
import log from 'utils/log.utils'

async function connectDB() {
 return mongoose
  .connect(process.env.DB_URI ?? '', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
  })
  .then(cn => log.info(`DB connected with HOST: ${cn.connection.host}`))
  .catch(error => {
   log.error('DB error', error)
   process.exit(1)
  })
}

export default connectDB
