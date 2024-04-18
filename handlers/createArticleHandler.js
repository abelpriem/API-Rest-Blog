import createArticle from '../logic/createArticle.js'
import { errors } from '../utils/index.js'
const { ContentError } = errors

export default async (req, res) => {
    const parametros = req.body
    const { title, content } = parametros

    try {
        await createArticle(title, content)
        res.status(201).json({ success: true, message: 'Article successfully created!' })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError) {
            status = 409
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }

}