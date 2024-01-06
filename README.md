# Introduction

This project runs a nodejs application and uses mongodb as database. It has an API that performs the CRUD operations by interacting with database. The creates a product , updates a product, get a single and all products and deletes a product.

Look at the [file](models/productModels.js) to know about schema of a product.

# Local Setup

Follow the following steps if you want to run this app on your local machine.
## Install Node and NPM

Install npm from [here](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)  and node  [here](https://nodejs.org/en/download/package-manager).

## Install mongodb 

Install mongo db from [here](https://www.mongodb.com/docs/manual/installation/).

## Build the application 

Build the application using `npm install`.

## Run the application 

Ensure mongodb is running. You can test using mongo db compass. This is the connection string 
`mongodb://localhost:27017/`. 

After that run `node server.js`

Now go to browser and type `localhost:3000` or `localhost:3000/blog`
 
# Running the tests

Follow the [README](tests/README.md) of tests if you want to know about tests. 
Use `npm test` to run the test.


# CI with GitHub Actions

Push something in some branch raise a pull request in the repository. You will see the tests being executed in the actions section.

Like this

![alt text](images/actions.png)

# Docker 

For docker follow this [README.md](docker/README.md).

# Kubernetes 

For kubernetes follow this [README.md](kubernetes/README.md).

# Vagrant and Ansible 

For vagrant and ansible follow this [README.md](iac/README.md).

# Istio
For istio follow this [README.md](istio/README.md).


# Monitoring
For monitoring follow this [README.md](monitoring/README.md).
