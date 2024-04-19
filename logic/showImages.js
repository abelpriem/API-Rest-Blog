import fs from 'fs/promises'
import { errors } from '../utils/index.js'
const { SystemError, NotFoundError } = errors

export default async function showImages(imageUrl) {
    try {
        const routeImage = `./images/articles/${imageUrl}`
        await fs.access(routeImage)

        return routeImage
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new NotFoundError('Image not found. Try again...')
        }

        throw new SystemError(error.message)
    }
}