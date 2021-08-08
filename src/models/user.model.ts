import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserDocument extends mongoose.Document {
 email: string
 name: string
 password: string
 createdAt: Date
 updatedAt: Date
 comparePasswords(candidatePassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema(
 {
  email: {
   type: String,
   required: true,
   unique: true,
  },
  name: {
   type: String,
   required: true,
  },
  password: {
   type: String,
   required: true,
  },
 },
 {timestamps: true},
)

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
 let user = this as UserDocument
 //Hash if password is new or changed
 if (!user.isModified('password')) return next()

 //create hash
 const hash = await bcrypt.hash(user.password, 10)
 //replace password with new hash
 user.password = hash

 return next()
})

UserSchema.methods.comparePasswords = async function (
 candidatePassword: string,
) {
 const user = this as UserDocument
 return bcrypt.compare(candidatePassword, user.password).catch(e => false)
}

const User = mongoose.model<UserDocument>('User', UserSchema)

export default User
