import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { expect } from 'chai'
import random from './helpers/random.js'
import { Article } from '../data/models.js'
import searchFile from '../logic/searchFile.js'
import { errors } from '../utils/index.js'
const { NotFoundError } = errors

dotenv.config()

describe('searchFile', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_API_TEST))

    beforeEach(() => Article.deleteMany())

    // POSITIVE CASE - Search a file
    it('success on searching a file', async () => {
        const title = random.text()
        const content = random.text()

        await Article.create({ title: title, content: content, date: Date.now(), img: 'default.png' })

        const articleSearched = await searchFile(title)

        expect(articleSearched).to.be.an('Array').that.has.lengthOf(1)
        expect(articleSearched[0].title).to.be.equal(title)
        expect(articleSearched[0].content).to.be.equal(content)
    })

    // NEGATIVE CASE - Article not found
    it('fails on article not found', async () => {
        const title = random.text()

        try {
            await searchFile(title)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Article not found... Try again')
        }
    })

    after(() => mongoose.disconnect())
})

