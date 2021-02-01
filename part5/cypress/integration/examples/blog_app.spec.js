describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'daniel',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('User fails to login', function () {
    cy.get('input:first').type('root')
    cy.get('input:last').type('wrongpassword')
    cy.contains('login').click()
    cy.contains('Wrong credentials')
  })

  it('User can login', function () {
    cy.get('input:first').type('root')
    cy.get('input:last').type('sekret')
    cy.contains('login').click()
  })

  it('User can create new blog', function () {
    cy.contains('new blog').click()
    cy.get('.title').type('blog post of daniel')
    cy.get('.author').type('some guy')
    cy.get('.url').type('www.randomurl.com')
    cy.contains('create').click()
  })

})