import React, { useState, useEffect } from 'react'
import Blog from './components/ShowBlogs'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const sortedBlogs = blogs.sort((a, b) => (b.likes - a.likes))

  const handleLogin = (event) => {
    event.preventDefault()
    loginService.login({ username, password }).then(user => {
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }).catch(error => {
      console.log(error)
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.clear()
  }

  const handleNewBlog = (e, blog) => {
    e.preventDefault()
    blogService.create(blog).then(() => {
      setMessage(`a new blog ${blog.title} by ${user.username} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }).catch(error => {
      console.log(error)
      setMessage('Something went wrong with creating a blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <p>{message}</p>
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  const handleLike = (e, blog) => {
    e.preventDefault()
    const likedBlog = blog
    likedBlog.likes = blog.likes + 1
    blogService.update(likedBlog.id, likedBlog)
      .then(() => {
        console.log(`Liked this blog: ${likedBlog.title}`)
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <h2>{message}</h2>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={() => handleLogout()}>
          logout
        </button>
      </p>
      <Togglable showLabel="new blog" hideLabel='cancel'>
        <CreateBlog handleSubmit={handleNewBlog}/>
      </Togglable>
      {sortedBlogs.map(blog =>
        <div key={blog.id}>
          <Blog blog={blog} />
          <Togglable showLabel='show' hideLabel='hide' key={blog.id}>
            <p><b>url:</b> {blog.url}</p>
            <p>
              <b>likes:</b> {blog.likes}<button onClick={(e) => handleLike(e, blog)}>Like</button>
            </p>
            <p><b>id:</b> {blog.id}</p>
            <button>remove</button>
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App