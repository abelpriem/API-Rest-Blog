import { Article } from '../data/models.js'
import { errors } from '../utils/index.js'
const { SystemError, NotFoundError } = errors

export default async function retrieveArticles(last) {
    try {
        if (last) {
            const lastArticles = await Article.find().limit(3).sort({ date: -1 })

            if (lastArticles.length === 0) {
                throw new NotFoundError('No articles created yet. Create one first!')
            }

            return lastArticles
        } else {
            const articles = await Article.find().sort({ date: -1 })

            if (articles.length === 0) {
                throw new NotFoundError('No articles created yet. Create one first!')
            }

            return articles
        }

    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}