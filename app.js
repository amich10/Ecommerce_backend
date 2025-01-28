import express from 'express'

const app = express()

const PORT = 4001;



app.listen(PORT, (request, response) =>{
    console.log(`The server is running on Port ${PORT}`)
})


app.use ((req,res,next) =>{
    next() // / Pass control
})
app.get('/', (req, res) =>{
    res.send("Hello World ")
})


app.get('/profile', (req,res) =>{
    res.send("Hello from profile page")
})

app.get('/profile/:username', (req,res) =>{
    res.send(`Hello from profile page, I am ${req.params.username}`)
})