import uploadFile from '../logic/uploadFile.js'
import { errors } from '../utils/index.js'
const { NotFoundError, ContentError } = errors

export default async (req, res) => {
    const file = req.file

    try {
        const newPath = await uploadFile(file.path, file.originalname, file.mimetype)

        file.path = newPath
        res.status(200).json({ success: true, message: 'File successfully uploaded!', file: file })

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