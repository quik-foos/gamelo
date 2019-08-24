import { Post } from './schema.mjs'

// Fetch all posts
const fetchPosts = (req, res) => {
  Post.find({}, (error, posts) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }  
    res.send(posts)
  }).sort({ _id:-1 })
}

// Get a single post
const getPost = (req, res) => {
  Post.findById(req.params.post_id, (error, post) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send(post)
  })
}

// Create a post
const createPost = (req, res) => {
  new Post({
    ...req.body
  }).save((error, post) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({
      message: 'Post created successfully',
      post: post
    })
  })
}

// Update a post
const updatePost = (req, res) => {
  Post.findById(req.params.post_id, (error, post) => {
    if (error || !post) {
      console.log(error)
      res.status(500).send(error)
      return
    } 
    Object.keys(req.body).forEach(key => {
      if (req.body) {
        post[key] = req.body[key]
      }
    })
    post.save((error, post) => {
      if (error) {
        console.log(error)
        res.status(500).send(error)
        return
      }
      res.send({
        message: 'Post updated successfully',
        post: post
      })
    })
  })
}

// Delete a post
const deletePost = (req, res) => {
  Post.remove({ _id: req.params.post_id }, (error) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({
      message: 'Post deleted successfully'
    })
  })
}

export default (express, passport) => {
  return express.Router()
    .get('/posts', fetchPosts)
    .get('/posts/:post_id', getPost)
    .post('/posts', createPost)
    .put('/posts/:post_id', updatePost)
    .delete('/posts/:post_id', deletePost)
}