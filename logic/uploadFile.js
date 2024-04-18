import fs from 'fs/promises'
import { errors } from '../utils/index.js'
const { NotFoundError, ContentError, SystemError } = errors

export default async function uploadFile(filePath, fileName, fileType) {
    try {
        const fileStats = await fs.stat(filePath)

        if (!fileStats.isFile()) {
            throw new NotFoundError('File not found or not valid... Try again')
        }

        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
        const fileMimeType = fileType

        if (!allowedMimeTypes.includes(fileMimeType)) {
            await fs.unlink(filePath)
            throw new ContentError('Invalid image type... Try again')
        }

        const newFileName = 'article' + '_' + Date.now() + '_' + fileName
        const newFilePath = `./images/articles/${newFileName}`

        await fs.rename(filePath, newFilePath)
        return newFilePath
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}
