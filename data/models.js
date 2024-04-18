import mongoose from 'mongoose'
const { model, Schema } = mongoose

// SCHEMAS
const articleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String,
        default: "default.png"
    }
})

// MODELS
const Article = new model('Article', articleSchema)

export {
    Article
}