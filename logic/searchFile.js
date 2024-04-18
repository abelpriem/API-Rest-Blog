import { Article } from '../data/models.js'
import errors from '../utils/errors.js'
const { SystemError, NotFoundError } = errors

export default async function searchFile(file) {
    try {
        const articleFind = await Article.find({
            '$or': [
                { 'title': { '$regex': file, '$options': 'i' } },
                { 'content': { '$regex': file, '$options': 'i' } }
            ]
        }).sort({ date: -1 })

        if (!articleFind || articleFind.length <= 0) {
            throw new NotFoundError('Article not found... Try again')
        }

        return articleFind

    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}