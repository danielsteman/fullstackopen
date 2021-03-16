const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {

  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (typeof blog.likes === 'undefined' || blog.likes === null) {
    blog.likes = 0
  }

  if (typeof blog.title === 'undefined' || typeof blog.url === 'undefined') {
    response.status(404).end()
  }
  
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  } catch (exception) {
    next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {

  const id = request.params.id

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const result = await Blog.findByIdAndRemove(id)
    response.json(result)
  } catch(exception) {
    next(exception)
  }
  
})

blogRouter.put('/:id', async (request, response, next) => {

  const content = request.body
  const id = request.params.id
  const newBlog = {...content}

  try {
    const result = await Blog.findByIdAndUpdate(id, newBlog)
    response.json(result)
  } catch(exception) {
    next(exception)
  }

})

module.exports = blogRouter

