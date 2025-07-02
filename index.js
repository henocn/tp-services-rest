const express = require('express');
const app = express();
const port = 3000;

const users = [
    {id : 1, username: "abalo", email : "abalo@gmail.com"},
    {id : 2, username: "henoc", email : "henoc@gmail.com"},
    {id : 3, username: "ali", email : "ali@gmail.com"},
    {id : 4, username: "ali", email : "ali1@gmail.com"},
]

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.get('/users', (req, res) => {
    res.send(users);
})

// app.get('/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users.find(user => user.id === parseInt(id));
//     res.send(user);
// })


// app.get('/users/:email', (req, res) => {
//     const email = req.params.email;
//     const user = users.find(user => user.email === email);
//     res.send(user);
// })


app.get('/names/:nom', (req, res) => {
    const nom = req.params.nom;
    const id = req.query.id;
    const user = users.filter(user => user.username === nom);
    if (id) {
        const user = users.filter(user => user.username === nom && user.id === parseInt(id));
        return res.send(user);
    }
    res.send(user)
})


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})