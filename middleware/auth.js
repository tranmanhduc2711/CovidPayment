const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.id = decoded.id
        console.log(decoded)
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }
}
const verifyToken2 = (req, res, next) => {
    const authHeader = req.body.Authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.id = decoded.id
        console.log(decoded)
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }
}
module.exports = { verifyToken, verifyToken2 }