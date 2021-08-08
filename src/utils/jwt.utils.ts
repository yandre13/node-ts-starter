import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.PRIVATE_KEY as string
function sign(object: Object, options?: jwt.SignOptions | undefined) {
 return jwt.sign(object, SECRET_KEY, options)
}

function decode(token: string) {
 try {
  const decoded = jwt.verify(token, SECRET_KEY)
  return {valid: true, expired: false, decoded}
 } catch (error) {
  return {valid: false, expired: error.message === 'jwt expired', decoded: null}
 }
}
export {sign, decode}
