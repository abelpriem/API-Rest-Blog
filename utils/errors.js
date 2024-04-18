
// ERROR - SYSTEM 
class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// ERROR - NOT FOUND
class NotFoundError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// ERROR - CREDENTIALS
class CredentialsError extends Error {
    constructor(messag) {
        super(message)

        this.name = this.constructor.name
    }
}

// ERROR - CONTENT
class ContentError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// ERROR - TOKEN
class TokenError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// ERROR - DUPLICITY
class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

const errors = {
    SystemError,
    NotFoundError,
    CredentialsError,
    DuplicityError,
    ContentError,
    TokenError
}

export default errors