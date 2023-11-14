
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