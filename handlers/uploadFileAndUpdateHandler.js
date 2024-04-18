import uploadFileAndUpdate from '../logic/uploadFileAndUpdate.js'
import { errors } from '../utils/index.js'
const { NotFoundError, ContentError } = errors

export default async (req, res) => {
    const file = req.file
    const articleId = req.params.articleId

    try {
        const { newFilePath, newFileName, article } = await uploadFileAndUpdate(articleId, file.path, file.originalname, file.mimetype)

        file.path = newFilePath
        file.filename = newFileName

        res.status(200).json({ success: true, message: 'File successfully uploaded and article updated!', file: file, article: article })

    } catch (error) {
        let status = 500

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError) {
            status = 409
        }

        res.status(status).json({ success: false, error: error.constructor.name, message: error.message })
    }
}