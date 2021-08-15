import {FilterQuery, LeanDocument, UpdateQuery} from 'mongoose'
import Session from 'models/session.model'
import {UserDocument} from 'models/user.model'
import {SessionDocument} from 'models/session.model'
import {decode, sign} from 'utils/jwt.utils'
import {findUser} from './user.service'

export function createSession(userId: string, userAgent: string) {
 return Session.create({user: userId, userAgent})
}

export function createAccessToken({
 user,
 session,
}: {
 user:
  | Omit<UserDocument, 'password'>
  | LeanDocument<Omit<UserDocument, 'password'>>
 session:
  | Omit<SessionDocument, 'password'>
  | LeanDocument<Omit<SessionDocument, 'password'>>
}) {
 const accessToken = sign(
  {_id: user._id, session: session._id},
  {expiresIn: '15m'},
 )
 return accessToken
}

export async function reIssueAccessToken(refreshToken: string) {
 //Decode refreshToken
 const {decoded} = decode(refreshToken)
 // @ts-ignore
 if (!decoded || !decoded?._id) return false
 // Get the session
 // @ts-ignore
 const session = await Session.findById(decoded._id)
 // Make sure the session is valid
 if (!session || !session?.valid) return false
 const user = await findUser({_id: session.user})

 if (!user) return false
 const accessToken = createAccessToken({user, session})
 return accessToken
}

export function updateSession(
 query: FilterQuery<SessionDocument>,
 update: UpdateQuery<SessionDocument>,
) {
 //does not return the object
 return Session.updateOne(query, update)
}

export function deleteSession(query: FilterQuery<SessionDocument>) {
 //does not return the object
 return Session.deleteOne(query)
}

export function findSessions(query: FilterQuery<SessionDocument>) {
 return Session.find(query).lean()
}
