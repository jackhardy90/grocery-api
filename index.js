const uuidv4 = require('uuid/v4')
const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const DAL = require('./dataAccessLayer')
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();


app.use(bodyParser.json());

DAL.connect();

// const mongodbUsername = process.env.MONGODB_USERNAME
// console.log('mongodbUsername: ' + mongodbUsername)

// //await dataAcessLayer.connect()

// const products = require('./products.json')

app.get('/api/products', cors(), async function(req, res){
    // const result = Object.values(products);

    const result = await DAL.find();

    res.send(result);
});

app.post('/api/products', cors(), async function(req, res){
    const product = req.body;

    if (product.name && product.price > 0) {
        
        const result = await DAL.insert(product);
        
        res.send('Success');
    }
    else {
        res.send('Fail');
    }
});
app.get('/api/products/:id', cors(), async function(req, res){
    const id = req.params.id;
    
    const product = {
        _id: ObjectId(id)
    };

    const result = await DAL.find(product)
  


    if (result) {
        res.send(result)

    }else{
        res.send('ID: ' + id + 'not found')
    }
});
app.delete('/api/products/:id', cors(), async function(req, res){
    const id = req.params.id;
    const product = {
        _id: ObjectId(id)
    }

    const result = await DAL.remove(product)

    res.send();
})

app.put('/api/products/:id', cors(), async function (req, res){
    const id = req.params.id;
    const product = {
        _id: ObjectId(id)
    };
    const newProduct = req.body;
    const updatedProduct = {
        $set: newProduct
    }

    const result = await DAL.update(product, updatedProduct);
    res.send();
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))