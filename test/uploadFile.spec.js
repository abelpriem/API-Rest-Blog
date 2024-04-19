import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import { expect } from 'chai'
import random from './helpers/random.js'
import { Article } from '../data/models.js'
import uploadFile from '../logic/uploadFile.js'
import { errors } from '../utils/index.js'
const { NotFoundError, ContentError } = errors

dotenv.config()

describe('uploadFile', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_API_TEST))

    beforeEach(() => Article.deleteMany())

    // POSITIVE CASE - Upload file
    it('success on uploading a file', async () => {
        const filePath = './images/articles/0123456789.jpg'
        const fileName = 'file_testing_uploadFile.jpg'
        const fileType = 'image/jpg'

        await fs.writeFile(filePath, 'jpg')

        const newFilePath = await uploadFile(filePath, fileName, fileType)

        let fileExist = true

        try {
            await fs.access(newFilePath)
        } catch (error) {
            fileExist = false
        }
        expect(newFilePath).to.be.exist
    })

    // NEGATIVE CASE - File not found
    it('fails on file not found', async () => {
        const filePath = './images/articles/'
        const fileName = random.text()
        const fileType = random.text()

        try {
            await uploadFile(filePath, fileName, fileType)
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

        try {
            await uploadFile(filePath, fileName, fileType)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Invalid image type... Try again')
            expect(newPath).to.be.undefined
        }
    })


    after(() => mongoose.disconnect())
})

