// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const {app, start} = require('../app'); // Change this to the path where your app is located
// const Product = require('../models/productModel');

// chai.use(chaiHttp);
// const expect = chai.expect;

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// describe('API Tests', () => {
//   before(async () => {
//     // Perform setup tasks if needed
//     await delay(5000);
//   });

//   after(async () => {
//     // Perform teardown tasks if needed
//   });

//   it('should return Hello NODE API', async () => {
//     //await delay(3000); // 3 seconds delay
//     console.log("requesting..");
//     chai
//       .request(app)
//       .get('/')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.text).to.equal('Hello NODE API');
//       });
//       console.log(res);
//   });

//   // it('should return products', async () => {
//   //   await delay(3000); // 3 seconds delay
//   //   chai
//   //     .request(app)
//   //     .get('/products')
//   //     .end((err, res) => {
//   //       expect(res).to.have.status(200);
//   //       expect(res.body).to.be.an('array');
//   //     });
//   // });

//   // it('should create a new product', async () => {
//   //   await delay(3000); // 3 seconds delay
//   //   const newProduct = {
//   //     // Add your product data here
//   //   };

//   //   chai
//   //     .request(app)
//   //     .post('/products')
//   //     .send(newProduct)
//   //     .end((err, res) => {
//   //       expect(res).to.have.status(200);
//   //       expect(res.body).to.be.an('object');
//   //       // You can add more assertions based on your application logic
//   //     });
//   // });

//   // it('should update a product', async () => {
//   //   await delay(3000); // 3 seconds delay
//   //   const updatedProduct = {
//   //     // Add your updated product data here
//   //   };

//   //   chai
//   //     .request(app)
//   //     .put('/products/:id') // replace :id with an actual product ID
//   //     .send(updatedProduct)
//   //     .end((err, res) => {
//   //       expect(res).to.have.status(200);
//   //       expect(res.body).to.be.an('object');
//   //       // You can add more assertions based on your application logic
//   //     });
//   // });

//   // it('should delete a product', async () => {
//   //   await delay(3000); // 3 seconds delay
//   //   chai
//   //     .request(app)
//   //     .delete('/products/:id') // replace :id with an actual product ID
//   //     .end((err, res) => {
//   //       expect(res).to.have.status(200);
//   //       expect(res.body).to.be.an('object');
//   //       // You can add more assertions based on your application logic
//   //     });
//   // });

//   // // Add more test cases for other endpoints

// });



const chai = require( 'chai' )
const chaiHttp = require( 'chai-http' )
const expect = chai.expect
chai.use( chaiHttp )


describe( 'first test group', () => {
   beforeEach( () => {
      app = require( '../server' )
   } ),

   afterEach( ( done ) => {

      // UPDATE DON'T CLOSE THE app

      delete require.cache[require.resolve( '../server' )]
      done()      
   } ),

   it( 'should respond to hello', ( done ) => {
      chai.request( app )
         .get( '/' )
         .set( 'Connection', 'close' )
         .end( ( err, res ) => {
            expect( res.text ).to.be.equal( 'Hello NODE API' )
            done()
         } )
   } ),

   it( 'should respond to blog', ( done ) => {
      chai.request( app )
         .get( '/blog' )
         .set( 'Connection', 'close' )
         .end( ( err, res ) => {
            expect( res.text ).to.be.equal( 'Hello Blog, My name is Deepanshu' )
            done()
         } )
   } )
} )