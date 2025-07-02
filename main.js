const express = require("express");
const app = express ();
const port = 5000

app.listen(port, () =>{
    console.log(`Serveur lancé sur le port ${port}`)
})

const products = [
    {id: 1, name : "Lacoste XL", category: "Vetement", price: 3500, createdAt: new Date()},
    {id: 2, name : "Veste", category: "Vetement", price: 2500, createdAt: new Date()},
    {id: 3, name : "Table", category: "Meuble", price: 4000, createdAt: new Date()},
    {id: 4, name : "Cahier", category: "Ecolier", price: 1700, createdAt: new Date()},
    {id: 5, name : "Chaise", category: "Meuble", price: 5000, createdAt: new Date()}
]

// Implementation d'une méthode GET
// Récuperer tous les produits
app.get("/products", (req, res) => {
    return res.status(200).send({products : products, status: 200})
})

// Récupération d'un seul produit
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
        const product = products.find(p => p.id === parseInt(id))
        if (product){
            return res.status(200).send({product: product, status: 200})
        }
        return res.status(404).send({detail: "No ptoduct found with this id", status : 404})
    }
    return res.status(403).send({error : "Please enter the id", status: 403})
})