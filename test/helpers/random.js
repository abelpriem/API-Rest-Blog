import { Types } from 'mongoose'
const { ObjectId } = Types

// RANDOM TEXT
function text() {
    return `text-${Math.random()}`
}

// RANDOM ID
function id() {
    return new ObjectId().toString()
}

const random = {
    text,
    id
}

export default random