import {Request, Response} from 'express'
import {
 createPost,
 findPost,
 findAndUpdatePost,
 deletePost,
} from 'services/post.service'

export async function createPostHandler(req: Request, res: Response) {
 try {
  // @ts-ignore
  const userId = req.user._id
  const body = req.body
  const post = await createPost({...body, user: userId})
  return res.status(201).send({
   success: true,
   post,
  })
 } catch (error) {
  return res.status(400).send({
   success: false,
   error: error.message,
  })
 }
}

export async function updatePostHandler(req: Request, res: Response) {
 try {
  // @ts-ignore
  const userId = req.user._id
  // @ts-ignore
  const postId = req.params.id
  const update = req.body
  const post = await findPost({_id: postId})
  if (!post) {
   return res.status(404).send({
    success: false,
    error: 'Post not found',
   })
  }
  if (String(post.user) !== userId) {
   return res.status(401).send({
    success: false,
    error: 'Unauthorized',
   })
  }
  const updatedPost = await findAndUpdatePost({_id: postId}, update, {
   new: true,
  })
  return res.status(200).send({
   success: true,
   post: updatedPost,
  })
 } catch (error) {
  return res.status(400).send({
   success: false,
   error: error.message,
  })
 }
}

export async function getPostHandler(req: Request, res: Response) {
 try {
  // @ts-ignore
  const postId = req.params.id
  const post = await findPost({_id: postId})
  if (!post) {
   return res.status(404).send({
    success: false,
    error: 'Post not found',
   })
  }
  return res.status(200).send({
   success: true,
   post,
  })
 } catch (error) {
  return res.status(400).send({
   success: false,
   error: error.message,
  })
 }
}

export async function deletePostHandler(req: Request, res: Response) {
 try {
  // @ts-ignore
  const userId = req.user._id
  // @ts-ignore
  const postId = req.params.id
  const post = await findPost({_id: postId})
  if (!post) {
   return res.status(404).send({
    success: false,
    error: 'Post not found',
   })
  }
  if (String(post.user) !== userId) {
   return res.status(401).send({
    success: false,
    error: 'Unauthorized',
   })
  }
  await deletePost({_id: postId})
  return res.status(200).send({
   success: true,
   message: 'Product deleted successfully',
  })
 } catch (error) {
  return res.status(400).send({
   success: false,
   error: error.message,
  })
 }
}
