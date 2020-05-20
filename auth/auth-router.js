const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')

const router = require('express').Router();

const Users = require('../users/users-model')
const { isValid } = require('../users/users-service')

//post /register
router.post('/register', (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 12;
        const hash = bcryptjs.hashSync(credentials.password, rounds)

        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                res.status(201).json({ user: user })
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
        // console.log('this is an error in .add', error);
    } else {
        res.status(400).json({
            message: 'please provide your username, your password, and department'
        })
    }
})

//post /login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = createToken(user);
                    res.status(200).json({ message: 'Welcome to our API', token })
                } else {
                    res.status(401).json({ message: 'Credentials are invalid unfortunately' })
                }
            })
    }
})

//create token
function createToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
    }
    const secret = process.env.JWT_SECRET || 'keepitsecret,keepitsafe!'

    const options = {
        expiresIn: '2h'
    }
    return jwt.sign(payload, secret, options)
}

module.exports = router;