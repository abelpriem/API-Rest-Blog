import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { expect } from 'chai'
import random from './helpers/random.js'
import { Article } from '../data/models.js'
import createArticle from '../logic/createArticle.js'
import { errors } from '../utils/index.js'
const { ContentError, DuplicityError } = errors

dotenv.config()

describe('createArticle', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_API_TEST))

    beforeEach(() => Article.deleteMany())

    // POSITIVE CASE - Create new article
    it('success on create new article', async () => {
        const title = random.text()
        const content = random.text()

        const article = await createArticle(title, content)

        expect(article).to.be.an('Object')
        expect(article.title).to.be.equal(title)
        expect(article.content).to.be.equal(content)
    })

    // NEGATIVE CASE - Empty info: title 
    it('fails with empty title value on information', async () => {
        const title = ''
        const content = random.text()

        try {
            await createArticle(title, content)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Invalid info. Try again')
        }
    })

    // NEGATIVE CASE - Empty info: content 
    it('fails with empty content value on information', async () => {
        const title = random.text()
        const content = ''

        try {
            await createArticle(title, content)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Invalid info. Try again')
        }
    })

    // NEGATIVE CASE - Create duplicate article
    it('fails with create a file already exit', async () => {
        const title = random.text()
        const content = random.text()

        await Article.create({ title: title, content: content, date: Date.now(), img: 'default.png' })

        try {
            await createArticle(title, content)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.be.equal('Article already exist. Try again')
        }
    })

    after(() => mongoose.disconnect())
})

