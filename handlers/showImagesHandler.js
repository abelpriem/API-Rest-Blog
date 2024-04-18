import path from 'path'
import showImages from '../logic/showImages.js'
import { errors } from '../utils/index.js'
const { ContentError, NotFoundError } = errors

export default async (req, res) => {
    const imageUrl = req.params.imageUrl

    try {
        const routeImage = await showImages(imageUrl)
        res.sendFile(path.resolve(routeImage))
    } catch (error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError) {
            status = 409
        }

        res.status(status).json({ success: false, error: error.constructor.name, message: error.message })
    }
}