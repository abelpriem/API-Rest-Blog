import validator from 'validator'
import { Article } from '../data/models.js'
import { errors } from '../utils/index.js'
const { SystemError, NotFoundError, ContentError } = errors

export default async function retrieveOneArticle(articleId) {
    try {
        const validateId = validator.isMongoId(articleId)
        if (!validateId) {
            throw new ContentError('Invalid ID. Try again')
        }

        const article = await Article.findById(articleId)

        if (!article) {
            throw new NotFoundError('Article not found. Try again')
        }

        return article

    } catch (error) {
        if (error instanceof ContentError || error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}