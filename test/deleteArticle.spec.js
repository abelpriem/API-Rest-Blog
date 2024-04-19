import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { expect } from 'chai'
import random from './helpers/random.js'
import { Article } from '../data/models.js'
import deleteArticle from '../logic/deleteArticle.js'
import { errors } from '../utils/index.js'
const { ContentError, NotFoundError } = errors

dotenv.config()

describe('deleteArticle', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_API_TEST))

    beforeEach(() => Article.deleteMany())

    // POSITIVE CASE - Delete an saved article
    it('success on delete a existing article', async () => {
        const title = random.text()
        const content = random.text()

        const article = await Article.create({ title: title, content: content, date: Date.now(), img: 'default.png' })
        await deleteArticle(article.id)

        const value = await Article.findById(article.id)

        expect(value).to.be.null
    })

    // NEGATIVE CASE - Invalid article ID
    it('fails on invalid article ID', async () => {
        const articleId = random.text()

        try {
            await deleteArticle(articleId)
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
            await deleteArticle(articleId)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Article not found. Try again')
        }
    })

    after(() => mongoose.disconnect())
})

