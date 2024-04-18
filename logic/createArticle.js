import { Article } from '../data/models.js'
import validator from 'validator'
import { errors } from '../utils/index.js'
const { SystemError, ContentError, DuplicityError } = errors

export default async function createArticle(title, content) {
    try {
        const validateTitle = !validator.isEmpty(title) && validator.isLength(title, { min: 0, max: 10 })
        const validateContent = !validator.isEmpty(content)

        if (!validateContent || !validateTitle) {
            throw new ContentError('Invalid info. Try again')
        }

        const article = await Article.create({ title: title, content: content })

        return article

    } catch (error) {
        if (error.code === 11000) {
            throw new DuplicityError('Article already exist. Try again')
        }

        if (error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}