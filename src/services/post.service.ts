//Services for db calls
import {
 DocumentDefinition,
 FilterQuery,
 QueryOptions,
 UpdateQuery,
} from 'mongoose'
import Post, {PostDocument} from 'models/post.model'

export function createPost(input: DocumentDefinition<PostDocument>) {
 return Post.create(input)
}

export function findPost(
 query: FilterQuery<PostDocument>,
 projection: string | Object = {},
) {
 return Post.findOne(query, projection).lean()
}

export function findAndUpdatePost(
 query: FilterQuery<PostDocument>,
 update: UpdateQuery<PostDocument>,
 options: QueryOptions = {new: true},
) {
 return Post.findOneAndUpdate(query, update, options).lean()
}

export function deletePost(query: FilterQuery<PostDocument>) {
 return Post.deleteOne(query)
}
