const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    //add token here to veriy users are logged in
    const token = req.headers.authorization;
    if (token) {
        const secret = process.env.JWT_SECRET || "keepitsecret,keepitsafe!"

        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                console.log("this is an error from verifying token", error);
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