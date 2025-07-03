const express = require("express");
const app = express ();
const port = 5000
app.use(express.json());

app.listen(port, () =>{
    console.log(`Serveur lancé sur le port ${port}`)
})

const products = [
    {id: 1, name : "Lacoste XL", category: "Vetement", price: 3500, createdAt: new Date()},
    {id: 2, name : "Veste", category: "Vetement", price: 2500, createdAt: new Date()},
    {id: 3, name : "Table", category: "Meuble", price: 4000, createdAt: new Date()},
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


// Récupération d'un seul produit
app.get("/product-info/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const quantity = req.query.quantity
    if(quantity) {
        const product = products.find(product => {
            product.prixTotal = quantity * product.price + " $";
            return product.id === id;
        })

        if (product){
            return res.status(200).send({product: product, status: 200})
        }
        return res.status(404).send({detail: "No ptoduct found with this id", status : 404})
    }
    
    return res.status(403).send({detail: "Please give the quantity", status : 404})
})


app.post("/products", (req, res) => {
    const data = req.body
    id = products.length + 1;
    const product = {
        id: id, name: data.name, category: data.category, price: data.price, createdAt: new Date()
    }
    if(!data.name || !data.price ){
        return res.status(403).json({detail : "Name and price are required", status: 403})
    }
    if(products.push(product)){
        return res.status(201).json({products: products, status: 201, message: "Product created successfully"})
    }
    return res.status(403).json({error: "Error while processing data, please retry", status: 403})
})



// Implementation d'un bulk de création de produits
app.post("/products/bulk", (req, res) => {
    const data = req.body;
    if(!data || !Array.isArray(data)){
        return res.status(400).json({detail: "Please provide an array of products", status: 400})
    }

    const invalidList = []
    const newProducts = data.map((item, index) => {
        if(!item.name || !item.price || item.price <= 0){
            invalidList.push(item)
        } else {
            return {
                id: products.length + index + 1,
                name: item.name,
                category: item.category,
                price: item.price,
                createdAt: new Date()
            }
        }
    })
    products + newProducts;
    
    if(invalidList.length == data.length) {
        return res.status(400).json({message: "Tous les elements ne sont pas corrects", status: 400})
    } 
    if(invalidList.length == 0){
        return res.status(201).json({data: products, status: 201, message: "Réussi"})
    }
    return res.status(201).json({data: products, invalidList: invalidList, status: 201, message: "Réussi partiellement"})
})


// Implementation d'une méthode PUT
app.put("/products/:id", (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id);
    if(!data || !id){
        return res.status(400).json({detail: "Please provide the id and the data to update", status: 400})
    }
    if(!data.name || !data.price || data.price <= 0){
        return res.status(403).json({detail : "Name and price are required", status: 403})
    }
    // id n'existe pas
    if ( ){
        return res.status.apply(404).json({mesage: "Id n'existe pas", status: 404})
    }
    products.map((product) => {
        product.id === id ? (
            product.name = data.name,
            product.category = data.category,
            product.price = data.price,
            product.createdAt = new Date()
        ) : product
    })
    return res.status(200).json({products: products, status: 200, message: "Product updated"})

})