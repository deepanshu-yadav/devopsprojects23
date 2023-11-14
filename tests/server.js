// // test.js
// const { expect } = require('chai');
// const supertest = require('supertest');
// const server_module = require('../server'); // Update the path accordingly
// const { default: mongoose } = require('mongoose');

// const request = null;

// describe('CRUD Operations Test for Express Server', () => {
//   let productId; // Will store the ID of the created product for later tests

//   // Helper function to create a test product
//   async function createTestProduct() {
//     const response = await request.post('/products').send({
//       name: 'Test Product',
//       quantity: 10,
//       price: 29.99,
//       image: 'test-image-url',
//     });
//     productId = response.body._id;
//   }

//   before(async () => {
//     // Connect to MongoDB before running tests (if not already connected)
//     // You might need to modify this part based on your actual connection logic
//     //const connectMongo = require('./dbclient.js');
//     //await connectMongo();
//     // const url = 'mongodb://127.0.0.1:27017'; // Change the connection URL and database name as needed
//     // await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//     server_module.start();
//     request = supertest(server_module.app);
//   });

//   after(async () => {
//     // Clean up: delete the test product after all tests are done
//     if (productId) {
//       await request.delete(`/products/${productId}`);
//     }
//   });

//   it('should create a new product', async () => {
//     const response = await request.post('/products').send({
//       name: 'Test Product',
//       quantity: 10,
//       price: 29.99,
//       image: 'test-image-url',
//     });

//     expect(response.status).to.equal(200);
//     expect(response.body).to.have.property('_id');
//     expect(response.body.name).to.equal('Test Product');
//     expect(response.body.quantity).to.equal(10);
//     expect(response.body.price).to.equal(29.99);

//     // Store the product ID for later tests
//     productId = response.body._id;
//   });

//   it('should get all products', async () => {
//     const response = await request.get('/products');

//     expect(response.status).to.equal(200);
//     expect(response.body).to.be.an('array');
//   });

//   it('should get a specific product by ID', async () => {
//     await createTestProduct(); // Create a test product first

//     const response = await request.get(`/products/${productId}`);

//     expect(response.status).to.equal(200);
//     expect(response.body).to.have.property('_id', productId);
//   });

//   it('should update a product', async () => {
//     await createTestProduct(); // Create a test product first

//     const response = await request.put(`/products/${productId}`).send({
//       quantity: 20,
//       price: 39.99,
//     });

//     expect(response.status).to.equal(200);
//     expect(response.body).to.have.property('_id', productId);
//     expect(response.body.quantity).to.equal(20);
//     expect(response.body.price).to.equal(39.99);
//   });

//   it('should delete a product', async () => {
//     await createTestProduct(); // Create a test product first

//     const response = await request.delete(`/products/${productId}`);

//     expect(response.status).to.equal(200);
//     expect(response.body).to.have.property('_id', productId);
//   });
// });


const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, start } = require('../server'); // Replace with the actual file path

const expect = chai.expect;
chai.use(chaiHttp);

// Start the server before running tests
before(async () => {
  await start();
});

// Close the server after running tests
after(async () => {
  // Close any connections, cleanup, etc.
});

describe('CRUD Operations', () => {
  let productId;

  // Test GET /products
  it('should get all products', (done) => {
    chai.request(app)
      .get('/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test POST /products
  it('should create a new product', (done) => {
    const newProduct = {
      // Provide the necessary data for creating a product
      // ...
    };

    chai.request(app)
      .post('/products')
      .send(newProduct)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        productId = res.body._id; // Save the product ID for later tests
        done();
      });
  });

  // Test GET /products/:id
  it('should get a specific product', (done) => {
    chai.request(app)
      .get(`/products/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Test PUT /products/:id
  it('should update a product', (done) => {
    const updatedProduct = {
      // Provide the necessary data for updating the product
      // ...
    };

    chai.request(app)
      .put(`/products/${productId}`)
      .send(updatedProduct)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // You can add more assertions for the updated data
        done();
      });
  });

  // Test DELETE /products/:id
  it('should delete a product', (done) => {
    chai.request(app)
      .delete(`/products/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});