// test.js
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../server'); // Update the path accordingly
const { default: mongoose } = require('mongoose');

const request = supertest(app);

describe('CRUD Operations Test for Express Server', () => {
  let productId; // Will store the ID of the created product for later tests

  // Helper function to create a test product
  async function createTestProduct() {
    const response = await request.post('/products').send({
      name: 'Test Product',
      quantity: 10,
      price: 29.99,
      image: 'test-image-url',
    });
    productId = response.body._id;
  }

  before(async () => {
    // Connect to MongoDB before running tests (if not already connected)
    // You might need to modify this part based on your actual connection logic
    //const connectMongo = require('./dbclient.js');
    //await connectMongo();
    // const url = 'mongodb://127.0.0.1:27017'; // Change the connection URL and database name as needed
    // await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Starting the server....");
  });

  after(async () => {
    // Clean up: delete the test product after all tests are done
    if (productId) {
      await request.delete(`/products/${productId}`);
    }
  });

  it('should create a new product', async () => {
    const response = await request.post('/products').send({
      name: 'Test Product',
      quantity: 10,
      price: 29.99,
      image: 'test-image-url',
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('_id');
    expect(response.body.name).to.equal('Test Product');
    expect(response.body.quantity).to.equal(10);
    expect(response.body.price).to.equal(29.99);

    // Store the product ID for later tests
    productId = response.body._id;
  });

  it('should get all products', async () => {
    const response = await request.get('/products');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('should get a specific product by ID', async () => {
    await createTestProduct(); // Create a test product first

    const response = await request.get(`/products/${productId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('_id', productId);
  });

  it('should update a product', async () => {
    await createTestProduct(); // Create a test product first

    const response = await request.put(`/products/${productId}`).send({
      quantity: 20,
      price: 39.99,
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('_id', productId);
    expect(response.body.quantity).to.equal(20);
    expect(response.body.price).to.equal(39.99);
  });

  it('should delete a product', async () => {
    await createTestProduct(); // Create a test product first

    const response = await request.delete(`/products/${productId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('_id', productId);
  });
});