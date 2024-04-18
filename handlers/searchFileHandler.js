import searchFile from '../logic/searchFile.js'
import errors from '../utils/errors.js'
const { NotFoundError } = errors

export default async (req, res) => {
    const file = req.params.fileToSearch

    try {
        const articleFind = await searchFile(file)
        res.status(200).json(articleFind)
    } catch (error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        res.status(status).json({ success: false, error: error.constructor.name, message: error.message })
    }
}