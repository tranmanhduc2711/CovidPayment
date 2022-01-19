require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const middleware = require('./middleware/auth')

const app = express()

app.use(express.json())

const { QueryTypes } = require("sequelize");
const { models } = require("./models");
const sq = require("./models/index");
sq.sequelize
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

// database
let users = [{
        id: 1,
        username: 'henry',
        refreshToken: null
    },
    {
        id: 2,
        username: 'jim',
        refreshToken: null
    }
]
const Account = require("./controllers/Account/accountController");
const History = require("./controllers/History/historyController");

// app



app.post('/login', (req, res) => {
    Account.find(req, res)
})

app.delete('/logout', middleware.verifyToken, (req, res) => {
    //Account.delete(req, res)
    console.log("hi")

    console.log(req.id)

})
app.post('/update', middleware.verifyToken2, (req, res) => {
    Account.updateMoney(req, res)
})

/*app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const user = users.find(user => user.refreshToken === refreshToken)
    if (!user) return res.sendStatus(403)

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        const tokens = generateTokens(user)
        updateRefreshToken(user.username, tokens.refreshToken)

        res.json(tokens)
    } catch (error) {
        console.log(error)
        res.sendStatus(403)
    }
})

app.delete('/logout', verifyToken, (req, res) => {
    const user = users.find(user => user.id === req.userId)

    res.sendStatus(204)
})*/

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))