import mongoose from 'mongoose'
import multer from 'multer'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import {
    articleHandler,
    createArticleHandler,
    retrieveArticlesHandler,
    retrieveOneArticleHandler,
    deleteArticleHandler,
    updateArticleHandler,
    uploadFileHandler,
    uploadFileAndUpdateHandler,
    showImagesHandler,
    searchFileHandler
} from './handlers/index.js'

dotenv.config()

// SERVER CONNECTION
mongoose.connect(process.env.URL_MONGODB_API_BLOG)
    .then(() => {
        const server = express()
        const jsonBodyParser = express.json()

        // MULTER - OPTION CONFIGURATION
        // const finalStorage = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //         cb(null, './images/articles/')
        //     },
        //     filename: (req, file, cb) => {
        //         cb(null, 'article' + Date.now() + file.originalname)
        //     }
        // })

        // const upload = multer({ storage: finalStorage })
        const upload = multer({ dest: 'images/articles' })


        // DATA TYPE: URLENCODED
        const urlEncoded = express.urlencoded({ extended: true })

        server.use(cors())

        // RUTA DE PRUEBA - ARTICLE
        server.get('/api/ruta-de-prueba', articleHandler)

        // CREATE ARTICLE
        server.post('/api/create', urlEncoded, createArticleHandler)

        // RETRIEVE ARTICLES
        server.get('/api/articles/:last?', retrieveArticlesHandler)

        // RETRIEVE ONE ARTICLE
        server.get('/api/article/:articleId', retrieveOneArticleHandler)

        // DELETE ARTICLE
        server.delete('/api/article/:articleId', deleteArticleHandler)

        // UPDATE ARTICLE
        server.patch('/api/article/:articleId', updateArticleHandler)

        // UPLOAD FILE
        server.post('/api/upload', upload.single('file'), uploadFileHandler)

        // UPLOAD FILE AND UPDATE ARTICLE IMG
        server.post('/api/upload/:articleId', upload.single('file'), uploadFileAndUpdateHandler)

        // SHOW IMAGE
        server.get('/api/image/:imageUrl', showImagesHandler)

        // SEARCHER
        server.get('/api/search/:fileToSearch', searchFileHandler)

        server.listen(process.env.PORT, () => console.log(`Server Online! Listening on: ${process.env.PORT}`))
    })
    .catch(error => console.log(error))