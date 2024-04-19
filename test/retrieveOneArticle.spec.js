import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { expect } from 'chai'
import random from './helpers/random.js'
import { Article } from '../data/models.js'
import retrieveOneArticle from '../logic/retrieveOneArticle.js'
import { errors } from '../utils/index.js'
const { ContentError, NotFoundError } = errors

dotenv.config()

describe('retrieveOneArticle', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_API_TEST))

    beforeEach(() => Article.deleteMany())

    // POSITIVE CASE - Retrieve one article
    it('success on retrieve one article', async () => {
        const article = await Article.create({ title: random.text(), content: random.text(), date: Date.now(), img: 'default.png' })

        const articleRetrieved = await retrieveOneArticle(article.id)

        expect(articleRetrieved).to.be.an('Object')
        expect(articleRetrieved._id.toString()).to.be.equal(article.id)
    })

    // NEGATIVE CASE - Invalid article ID
    it('fails on retrieve article with invalid ID', async () => {
        const articleId = random.text()

        try {
            await retrieveOneArticle(articleId)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Invalid ID. Try again')
        }
    })

    // NEGATIVE CASE - Article not found
    it('fails on article not found', async () => {
        const articleId = random.id()

        try {
            await retrieveOneArticle(articleId)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Article not found. Try again')
        }
    })

    after(() => mongoose.disconnect())
})

