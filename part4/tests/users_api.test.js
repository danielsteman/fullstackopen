const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialUsers = [
    {
        username: "daniel-steman",
        name: "Daniel Steman",
        id: "5fda07630760f30ef9a0d96c"
    }
]

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
        const defaultUser = new User(initialUsers[0])
        await defaultUser.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'daniel-steman4',
            name: 'Daniel Steman',
            password: 'saberone'
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails without a username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            name: 'Daniel Steman',
            password: 'saberone'
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(404)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

})

afterAll(() => {
    mongoose.connection.close()
})