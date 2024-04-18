import fs from 'fs/promises'
import validator from 'validator'
import { errors } from '../utils/index.js'
const { SystemError, ContentError, NotFoundError } = errors

export default async function showImages(imageUrl) {
    try {
        const routeImage = `./images/articles/${imageUrl}`
        await fs.access(routeImage)

        return routeImage
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new NotFoundError('Image not found. Try again...')
        }

        if (error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}