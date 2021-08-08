import mongoose from 'mongoose'
import {UserDocument} from './user.model'

export interface PostDocument extends mongoose.Document {
 user: UserDocument['_id']
 title: string
 body: string
 createdAt: Date
 updatedAt: Date
}

const PostSchema = new mongoose.Schema(
 {
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, default: true},
  body: {type: String, default: true},
 },
 {timestamps: true},
)

const Post = mongoose.model<PostDocument>('Post', PostSchema)

export default Post
