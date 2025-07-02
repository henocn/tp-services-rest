const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.get('/users', (req, res) => {
    res.send("Users");
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})