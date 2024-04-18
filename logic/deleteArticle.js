import validator from 'validator'
import { Article } from '../data/models.js'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError, ContentError } = errors

export default async function deleteArticle(articleId) {
    try {
        const validateId = validator.isMongoId(articleId)

        if (!validateId) {
            throw new ContentError('Invalid ID. Try again')
        }

        const articleToDelete = await Article.findByIdAndDelete(articleId)

        if (!articleToDelete) {
            throw new NotFoundError('Article not found. Try again')
        }

    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}