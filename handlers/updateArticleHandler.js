import updateArticle from '../logic/updateArticle.js'
import { errors } from '../utils/index.js'
const { ContentError, NotFoundError } = errors

export default async (req, res) => {
    const articleId = req.params.articleId

    try {
        await updateArticle(articleId)
        res.status(200).json({ success: true, message: 'Article successfully updated!' })
    } catch (error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError) {
            status = 409
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}