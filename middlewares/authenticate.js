const jwt = require('jsonwebtoken');

module.exports = function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) res.send(401, {status: "Unauthorized"})

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
        if (err) res.send(403, {status: "Forbidden"})

        req.user = user

        next()
    })
}