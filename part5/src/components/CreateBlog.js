import React, { useState } from 'react'

const CreateBlog = ({ handleSubmit }) => {

  const [newBlog, setNewBlog] = useState({ author: '', title: '', url: '' })

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => handleSubmit(e, newBlog)}>
        <div>
          title:
          <input
            type="text"
            className="title"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            className="author"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/>
        </div>
        <div>
          url:
          <input
            type="text"
            className="url"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/>
        </div>
        <button type="submit" id="create-button">create</button>
      </form>
    </div>
  )
}

export default CreateBlog