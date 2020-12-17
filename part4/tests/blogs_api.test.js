const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        title: "life in the upperchurch",
        author: "daniel",
        url: "http://destronkenwerkstudent.nl/",
        likes: 5,
        userId: '5fda08a8de3a300f73015051'
    },
    {
        title: "plants are friends",
        author: "steman",
        url: "http://randomwebsite.com/",
        likes: 34,
        userId: '5fda08a8de3a300f73015051'
    }
]
describe('Saving blogs correctly in the database', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()
    })
    
    test('Correct number of blogs are returned in JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('ID is a defined property of blogs', async () => {
    
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog._id).toBeDefined()
        })
    })
    
    test('Blog is correctly added to database', async () => {
    
        const newBlog = {
            title: 'testdieshit',
            author: 'daniel',
            url: 'www.example.com',
            likes: 420,
            userId: '5fda08a8de3a300f73015051'
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const contents = response.body
        expect(contents).toHaveLength(initialBlogs.length + 1)
    })
    
    test('Blog without likes receives zero likes', async () => {
    
        const newBlog = {
            title: 'zerolikes',
            author: 'daniel',
            url: 'www.example.com',
            userId: '5fda08a8de3a300f73015051'
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const contents = response.body
        expect(contents[contents.length - 1].likes).toBeDefined()
    })
    
    test('Blog without author or URL should be denied', async () => {
        const newBlog = {
            userId: '5fda08a8de3a300f73015051'
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
})