import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { expect } from 'chai'
import random from './helpers/random.js'
import { Article } from '../data/models.js'
import updateArticle from '../logic/updateArticle.js'
import { errors } from '../utils/index.js'
const { NotFoundError, ContentError } = errors

dotenv.config()

describe('updateArticle', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_API_TEST))

    beforeEach(() => Article.deleteMany())

    // POSITIVE CASE - Update an article
    it('success on updating an article', async () => {
        const title = random.text()
        const content = random.text()

        const article = await Article.create({ title: title, content: content, date: Date.now(), img: 'default.png' })
        await updateArticle(article.id)

        const articleUpdated = await Article.findById(article.id)

        expect(articleUpdated.title).not.to.be.equal(article.title)
        expect(articleUpdated.content).not.to.be.equal(article.content)
    })

    // NEGATIVE CASE - Article not found
    it('fails on article not found', async () => {
        const articleId = random.id()

        try {
            await updateArticle(articleId)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Article not found. Try again')
        }
    })

    // NEGATIVE CASE - Invalid article ID
    it('fails on trying to update an article with invalid ID', async () => {
        const articleId = random.text()

        try {
            await updateArticle(articleId)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Invalid ID. Try again.')
        }
    })


    after(() => mongoose.disconnect())
})

