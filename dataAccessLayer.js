const MongoClient = require('mongodb').MongoClient;


require('dotenv').config();

const databaseName = 'Grocery-db';
const collectionName = 'products';
const mongodbUrl = process.env.MONGDODB_URL;
const settings = {
    useUnifiedTopology: true
};

console.log('url: ' + mongodbUrl);

let database;

const connect = function(){
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongodbUrl, settings, function(err, client){
            if(err){
                reject(err);
            }
            else{
                console.log('Successfully connected to the database!')
                database = client.db(databaseName);
                resolve();
            }
        });
    });
};

const insert = function(product){
    return new Promise((resolve, reject) => {
        const productCollection = database.collection(collectionName)

        productCollection.insertOne(product, function(err, res) {
            if(err){
                reject(err);
            }
            else {
                console.log('Successfully inserted new document');
                resolve(res);
            };

        });
    });
};

const find = function(product){

    let productQuery = {};

    if(product) {
        productQuery = product;
    }

    return new Promise((resolve, reject) => {
        const productCollection = database.collection(collectionName)

        productCollection.find(productQuery).toArray(function(err, res) {
            if(err){
                reject(err);
            }
            else{
                console.log('successfully found product');
                resolve(res);
            };
        });
    });
};

const update = function(product, newProduct) {
    
    return new Promise((resolve, reject) => {
        const productCollection = database.collection(collectionName)

        productCollection.updateOne(product, newProduct, function(err, res) {
            if(err){
                reject(err);
            }
            else{
                console.log('updated sucessfully')
                resolve(res);
            }
        });
    });
};

const remove = function(product){

    return new Promise((resolve, reject) => {
        const productCollection = database.collection(collectionName)

        productCollection.remove(product, function(err, res){
            if(err){
                reject(err);
            }
            else{
                console.log('removed successfully')
                resolve(res);
            }
        });
    });
};

// const promise = connect();

// promise
//     .then(() => {
//         console.log('Success connecting to server, promise finished sucessfully!')

        // const product = {
        //     name: 'butter',
        //     price: 9.99
        // };

        // insert(product)
        //     .then((res) => {
        //         console.log('succesfully inserted product')
        //     })
        //     .catch((err) => {
        //         console.log('product not inserted')
        //     });
    // })
    // .catch((err) => {
    //     console.log('promise returned an error')
    // });



        // find(product)
        //     .then((res) => {
        //         console.log('sucessfully found product');
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log('product not found')
        //     });


    // })
    // .catch((err) => {
    //     console.log('promise returned an error')
    // });


// const product = {
        //     name: 'butter',
        //     price: 9.99
        // };
// const newProduct = { $set: {name:'sugar'} };
    //  update(product, newProduct)
    //         .then((res) => {
    //             console.log('sucessfully updated product');
    //             // console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log('product not updated')
    //         })

    //     })
    //     .catch((err) => {
    //         console.log('promise returned an error')
    //     });
    

//  remove(product)
//             .then((res) => {
//                 console.log('product sucessfully removed');
//                 // console.log(res);
//             })
//             .catch((err) => {
//                 console.log('product not removed')
//             })


//         .catch((err) => {
//             console.log('promise returned an error')
//         });

// const product = {
//     name: 'sugar',
// }





//same thing but longer

// MongoClient.connect(mongodbUrl, function(err, client){
//     if(err) {
//         console.log("ERROR: " + err)
        
//     }
//     else {
//         database = client.db(databaseName)
//         const productCollection = database.collection('products');

//         productCollection.fing().toArray(function(err, docs){
//             if(err) {
//                 console.log('ERROR: ' + err);
//             }
//             else {
//                 docs.forEach((d) => {
//                     console.log(d);
//                 });
//             }
//         });

//         console.log("Succesfully connected to database!")
//     }
// });



module.exports = { connect, insert, update, remove, find }