const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const app = express()

app.use(express.json())
app.use(userRouter)

const port = process.env.port || 3000

app.get('/',(req,res) => {
    res.send('express app is running')
})
app.listen(port, () => {console.log('server is runing on port' + port);})