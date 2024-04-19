import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import { expect } from 'chai'
import random from './helpers/random.js'
import { Article } from '../data/models.js'
import uploadFileAndUpdate from '../logic/uploadFileAndUpdate.js'
import { errors } from '../utils/index.js'
const { NotFoundError, ContentError } = errors

dotenv.config()

describe('uploadFileAndUpdate', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_API_TEST))

    beforeEach(() => Article.deleteMany())

    // POSITIVE CASE - Upload file and update
    it('success on updating an article', async () => {
        const filePath = './images/articles/0123456789.jpg'
        const fileName = 'file_testing_uploadFileAndUpdate.jpg'
        const fileType = 'image/jpg'

        await fs.writeFile(filePath, 'jpg')
        const article = await Article.create({ title: random.text(), content: random.text(), date: Date.now(), img: 'default.png' })

        const { newFilePath } = await uploadFileAndUpdate(article.id, filePath, fileName, fileType)
        const articleUpdated = await Article.findById(article.id)

        let fileExist = true

        try {
            await fs.access(newFilePath)
        } catch (error) {
            fileExist = false
        }

        expect(fileExist).to.be.true
        expect(articleUpdated.img).to.be.equal(fileName)
    })

    // NEGATIVE CASE - Invalid article ID
    it('fails on trying to update with an invalid article ID', async () => {
        const articleId = random.text()
        const filePath = random.text()
        const fileName = random.text()
        const fileType = random.text()

        try {
            await uploadFileAndUpdate(articleId, filePath, fileName, fileType)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Invalid ID. Try again...')
        }
    })

    // NEGATIVE CASE - Article not found
    it('fails on article not found', async () => {
        const filePath = './images/articles/'
        const fileName = random.text()
        const fileType = random.text()

        const articleId = random.id()

        try {
            await uploadFileAndUpdate(articleId, filePath, fileName, fileType)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Article not found... Try again')
        }
    })

    // NEGATIVE CASE - File not found
    it('fails on file not found', async () => {
        const filePath = './images/articles/'
        const fileName = random.text()
        const fileType = random.text()

        const article = await Article.create({ title: random.text(), content: random.text(), date: Date.now(), img: 'default.png' })

        try {
            await uploadFileAndUpdate(article.id, filePath, fileName, fileType)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('File not found or not valid... Try again')
        }
    })

    // NEGATIVE CASE - Upload file with invalid extension
    it('fails on upload file with an invalid extension', async () => {
        const filePath = './images/articles/0123456789.txt'
        const fileName = 'file_testing.txt'
        const fileType = 'text/txt'

        const newPath = await fs.writeFile(filePath, 'txt')

        const article = await Article.create({ title: random.text(), content: random.text(), date: Date.now(), img: 'default.png' })

        try {
            await uploadFileAndUpdate(article.id, filePath, fileName, fileType)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Invalid image type... Try again')
            expect(newPath).to.be.undefined
        }
    })

    after(() => mongoose.disconnect())
})
