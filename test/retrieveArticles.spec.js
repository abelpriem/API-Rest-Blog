import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { expect } from 'chai'
import random from './helpers/random.js'
import { Article } from '../data/models.js'
import retrieveArticles from '../logic/retrieveArticles.js'
import { errors } from '../utils/index.js'
const { NotFoundError } = errors

dotenv.config()

describe('retrieveArticles', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_API_TEST))

    beforeEach(() => Article.deleteMany())

    // POSITIVE CASE - Retrieve list of articles
    it('success on retrieve a list of articles', async () => {
        const article1 = await Article.create({ title: random.text(), content: random.text(), date: Date.now(), img: 'default.png' })
        const article2 = await Article.create({ title: random.text(), content: random.text(), date: Date.now(), img: 'default.png' })
        const article3 = await Article.create({ title: random.text(), content: random.text(), date: Date.now(), img: 'default.png' })
        const article4 = await Article.create({ title: random.text(), content: random.text(), date: Date.now(), img: 'default.png' })

        const list = await retrieveArticles()

        expect(list).to.be.an('Array').that.has.length(4)
        expect(list[0].title).to.be.equal(article4.title)
        expect(list[1].title).to.be.equal(article3.title)
        expect(list[2].title).to.be.equal(article2.title)
        expect(list[3].title).to.be.equal(article1.title)
    })

    // NEGATIVE CASE - No articles created yet
    it('fails on retrieve articles with no one create yet', async () => {
        try {
            await retrieveArticles()
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('No articles created yet. Create one first!')
        }
    })

    after(() => mongoose.disconnect())
})

