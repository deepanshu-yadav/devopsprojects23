// test.js
const { expect } = require('chai');
const mongoose = require('mongoose');
const Product = require('../models/productModel'); 

describe('Product Model Test with Mongoose', () => {
  before(async () => {
    // Connect to MongoDB using Mongoose before running tests
    const url = 'mongodb://127.0.0.1:27017'; // Change the connection URL and database name as needed
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Close Mongoose connection after running tests
    await mongoose.connection.close();
  });

  it('should connect to MongoDB with Mongoose', () => {
    // Check if the Mongoose connection is successful
    expect(mongoose.connection.readyState).to.equal(1); // 1 means connected
  });

  it('should access the Product model', async () => {
    // Check if the Product model is registered and accessible
    const models = mongoose.modelNames();
    expect(models).to.include('Product');
  });

  it('should save a product to the MongoDB collection', async () => {
    // Create a new product document and save it to the collection
    const newProduct = new Product({
      name: 'Test Product',
      quantity: 10,
      price: 29.99,
      image: 'test-image-url',
    });

    await newProduct.save();

    // Verify that the document has been saved by checking its presence in the collection
    const retrievedProduct = await Product.findOne({ name: 'Test Product' });
    expect(retrievedProduct).to.exist;
    expect(retrievedProduct.quantity).to.equal(10);
    expect(retrievedProduct.price).to.equal(29.99);
    expect(retrievedProduct.image).to.equal('test-image-url');
  });

  it('should fail to save a product without a name', async () => {
    // Attempt to save a product without a name (should fail)
    const productWithoutName = new Product({
      quantity: 5,
      price: 19.99,
      image: 'another-test-image-url',
    });

    try {
      await productWithoutName.save();
    } catch (error) {
      // Check if the error message indicates a validation failure
      expect(error).to.be.an.instanceOf(mongoose.Error.ValidationError);
      expect(error.message).to.include('Product validation failed');
      expect(error.errors.name.message).to.equal('Please enter a product name');
      return;
    }

    // If the save succeeds unexpectedly, fail the test
    throw new Error('Product save succeeded, but it was expected to fail.');
  });
});