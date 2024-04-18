import validator from 'validator'
import { Article } from '../data/models.js'
import { errors } from '../utils/index.js'
const { SystemError, ContentError, NotFoundError } = errors

export default async function updateArticle(articleId) {
    try {
        const validateArticle = validator.isMongoId(articleId)

        if (!validateArticle) {
            throw new ContentError('Invalid ID. Try again.')
        }

        const article = await Article.findById(articleId)

        if (!article) {
            throw new NotFoundError('Article not found. Try again')
        }

        // UPDATE ARTICLE
        article.title = 'TittleUpdated'
        article.content = 'ContentUpdated'

        await article.save()
    } catch (error) {
        if (error instanceof ContentError || error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}