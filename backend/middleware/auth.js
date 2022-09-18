const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization; 
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); 
        const id_user = decodedToken.userId;
        req.auth = { id_user }; 
        if (Number(req.body.id_user) && Number(req.body.id_user) !== id_user) { 
            throw '403: unauthorized request'; 
        } else { 
            next(); 
        }
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};