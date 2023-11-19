# Introduction

# Local Setup

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

Use `npm test` to run the test.


# CI with GitHub Actions

Push something in some branch raise a pull request in the repository. You will see the tests being executed in the actions section.

Like this

![alt text](images/actions.png)

# Docker 

Go to the docker directory `cd docker`. 

Run the command `docker-compose build` and then `docker-compose up` . Exit by `docker-compose down` .

To test this now run 

```
azureuser@deepanshudevops:~/exp/data$ curl -sX GET http://localhost:3000
Hello NODE 
```

To send a POST request run this
```
 curl --header "Content-Type: application/json"   --request POST   --data '{"name":"xyz","quantity":"1", "price": "20"}'   http://localhost:3000/products
```

# Kubernetes 

## Push To DockerHub
We need to publish our containers to DockerHub. 

For that follow the following steps 

Build the mongo db conatiner. 
```
   cd mongo/
   docker build --file Dockerfile . -t mongo:latest
```

```
     cd nodejs/
     docker build --file Dockerfile . -t nodejsapp:latest
```

Now login into your DockerHub account
   using `docker login`

Now tag these images to your id. Replace pronoob007 with whatever is your id. 
```
    docker tag nodejsapp:latest  pronoob007/nodejsapp:latest
    docker tag mongo:latest  pronoob007/mongo:latest
```

Now we can push these images to DockerHub.
```
   docker push pronoob007/nodejsapp:latest
   docker push pronoob007/mongo:latest
```

## Use Kubernetes 

### Simple deployment 

make sure you have run the  minikube cluster 

```
 minikube start  --memory 12000  --cpus 2
```

Use  `cd  kubernetes/simple`

Then apply the following commands. 
```
    kubectl apply -f mongo-deployment.yaml
    kubectl apply -f mongo-service.yaml
    kubectl apply -f node-deploy.yaml
    kubectl apply -f node-service.yaml
```

Now you can get the address for curl request 

 minikube service nodejs-service --url 

 For example I got `http://192.168.49.2:30707`

 ```
  curl http://192.168.49.2:30707
 ```

This shows out app is working as before. 

```
$ curl http://192.168.49.2:30707/products
[{"_id":"655a6f85de87398cc510d2e0","name":"xyz","quantity":1,"price":20,"createdAt":"2023-11-19T20:26:45.763Z","updatedAt":"2023-11-19T20:26:45.763Z","__v":0}]
```
