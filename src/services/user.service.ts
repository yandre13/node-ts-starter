//Services for db calls
import {DocumentDefinition, FilterQuery} from 'mongoose'
import User, {UserDocument} from 'models/user.model'
import {omit} from 'lodash'

export function createUser(input: DocumentDefinition<UserDocument>) {
 return User.create(input)
}

export function findUser(
 query: FilterQuery<UserDocument>,
 projection: string | Object = {},
) {
 return User.findOne(query, projection).lean()
}

export async function validatePassword({
 email,
 password,
}: {
 email: UserDocument['email']
 password: UserDocument['password']
}) {
 const user = await User.findOne({email})
 if (!user) {
  return false
 }
 const isValid = await user.comparePasswords(password)
 if (!isValid) {
  return false
 }

 return omit(user.toJSON(), 'password')
}
