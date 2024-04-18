import retrieveArticles from '../logic/retrieveArticles.js'
import { errors } from '../utils/index.js'
const { NotFoundError } = errors

export default async (req, res) => {
    const last = req.params.last

    try {
        const articles = await retrieveArticles(last)
        res.status(200).json(articles)
    } catch (error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}