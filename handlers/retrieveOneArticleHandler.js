import retrieveOneArticle from '../logic/retrieveOneArticle.js'
import { errors } from '../utils/index.js'
const { NotFoundError } = errors

export default async (req, res) => {
    const articleId = req.params.articleId

    try {
        const article = await retrieveOneArticle(articleId)
        res.status(200).json(article)
    } catch (error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 400
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}