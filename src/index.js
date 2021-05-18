const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/book')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// without middleware: new request --> run route handler
// with middleware: new request --> do something --> run route handler

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const main = async () => {

//     const user = await
//     User.findById('60a262f33b9e9e3c9a17702f')
//     await user.populate('books').execPopulate()
//     console.log(user.books)

// }

// main()