import deleteArticle from '../logic/deleteArticle.js'
import { errors } from '../utils/index.js'
const { NotFoundError } = errors

export default async (req, res) => {
    const articleId = req.params.articleId

    try {
        await deleteArticle(articleId)
        res.status(200).json({ success: true, message: 'Article successfully deleted!' })
    } catch (error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 400
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}