const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.port || 3000

app.get('/',(req,res) => {
    res.send('express app is running')
})
app.listen(port, () => {console.log('server is runing on port' + port);})