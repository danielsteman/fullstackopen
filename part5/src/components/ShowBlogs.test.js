import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './ShowBlogs'

test('renders content', () => {
  const blog = {
    title: 'life in the upperchurch',
    author: 'daniel',
    url: 'http://destronkenwerkstudent.nl/',
    likes: 32,
    id: '5fe2649e660ffc02c586e5a7'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'life in the upperchurch'
  )

  expect(component.container).toHaveTextContent(
    'daniel'
  )

})