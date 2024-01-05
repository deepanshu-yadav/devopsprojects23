const express = require('express')
const prometheus = require('prom-client');
const metrics = require('./metrics');

const Product = require('./models/productModel')
const app = express()
const mongoose = require('mongoose');


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Configuration
var config = require('./configure');
conn_string = config.mongo_db.connection_string
console.log("Connecting to %s", conn_string)
mongoose.set("strictQuery", false)
STATE = config.state;

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/example', (req, res) => {
    const start = Date.now();
    const end = Date.now();
  
    metrics.httpRequestDuration.labels('GET', '/example').observe((end - start) / 1000);
  
    res.send('Response');
})

app.get('/metrics', (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(prometheus.register.metrics());
})

app.get('/blog', (req, res) => {
    if (STATE == "DEVELOPMENT") {
        res.send('Hello We are in Development state.');
    }
    else
    {
        res.send('Hello We are in Production state.');
    }
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




async function start() {
    try{
        await mongoose.connect(conn_string);
        console.log("Now starting the server...");

       
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

start().then(
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
        })
)

module.exports = app;
