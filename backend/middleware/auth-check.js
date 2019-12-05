const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"].split(' ')[1];
        const decodedToken = jwt.verify(token, 'sv-db-authentication-token');
        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId,
            userName: decodedToken.userName
        }
        next();
    } catch (error) {
        res.status(401).json({
            message: "You are not authenticated"
        })
    }
}