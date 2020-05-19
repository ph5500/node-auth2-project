const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    //add token here to veriy users are logged in
    const token = req.headers.authorization;
    if (token) {
        const secret = process.env.JQT_SECRET || "keepitsecret,keepitsafe!";
        jwt.verify(token, secre, (error, decodedToken) => {
            if (error) {
                //the token is invalid
                res.status(401).json({ message: "you shall not pass!" });
            } else {
                //the token is good
                req.jwt = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: "Please prvide the authentication information" });
    }
};