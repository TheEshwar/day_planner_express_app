const express = require("express")
const app = express()
const db = require('./app/config/db')
const path = require('path')
const cors = require('cors')
const { verifyToken } = require("./app/middleware/verifyToken")
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./app/config/auth.config")

// Connection to MongoDB Database
db()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes for User registration and Login
app.use('/api/user', require('./app/routes/loginRoutes'))

// Route for profile page
app.get('/profile', verifyToken, (req, res) =>{

    jwt.verify(req.token, SECRET_KEY, (error, authData) => {
        if(error)
        {
            res.status(400).json({message: "Invalid token...!"})
        }
        else{
            res.status(200).json({message: "Profile page is visible...!"})            
        }
    })
})

// Server
app.listen(3001, ()=>{
    console.log("Server is running at PORT 3001");
})
