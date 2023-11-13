
// test.js
const { expect } = require('chai');
const mongoose = require('mongoose');

describe('MongoDB Connection Test with Mongoose', () => {
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
});

