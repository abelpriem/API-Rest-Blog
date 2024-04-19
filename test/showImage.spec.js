import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import { expect } from 'chai'
import random from './helpers/random.js'
import { Article } from '../data/models.js'
import showImages from '../logic/showImages.js'
import { errors } from '../utils/index.js'
const { NotFoundError } = errors

dotenv.config()

describe('showImage', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_API_TEST))

    beforeEach(() => Article.deleteMany())

    // POSITIVE CASE - Show preview image
    it('success on showing a preview image', async () => {
        const filePath = './images/articles/image_testing_showImages.jpg'
        const fileName = 'image_testing_showImages.jpg'

        await fs.writeFile(filePath, 'jpg')
        const routeImage = await showImages(fileName)

        expect(routeImage).to.be.equal(filePath)
    })

    // NEGATIVE CASE - Image not found
    it('fails on image not found', async () => {
        const fileName = random.text()

        try {
            await showImages(fileName)
            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Image not found. Try again...')
        }
    })

    after(() => mongoose.disconnect())
})

