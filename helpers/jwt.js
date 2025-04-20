const { sign, verify } = require("jsonwebtoken");

const JWT_SECRET=ini-rahasia

const signToken = ({ id }) => {
    return sign({ id }, JWT_SECRET)
}

const verifyToken = (token) => {
    return verify(token, JWT_SECRET)
}

module.exports = { signToken, verifyToken }