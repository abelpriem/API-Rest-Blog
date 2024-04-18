import { errors } from './index.js'
const { ContentError } = errors

function text(string, explain) {
    if (typeof string !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!string.trim().length()) throw new ContentError(`${explain} is empty`)
}

const validate = {
    text,
}

export default validate