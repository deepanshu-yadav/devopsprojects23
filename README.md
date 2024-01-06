# Introduction

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

Use `npm test` to run the test.


# CI with GitHub Actions

Push something in some branch raise a pull request in the repository. You will see the tests being executed in the actions section.

Like this

![alt text](images/actions.png)

# Docker 



# Kubernetes 


# Vagrant and Ansible 

# Istio

## Pre-requisites
Make sure the cluster is running.
Install istio using this [link](https://istio.io/latest/docs/setup/getting-started/#install).

## Simple deployment

```
kubectl create ns node-mongo-istio
kubectl label namespace node-mongo-istio istio-injection=enabled

cd istio/simple

kubectl apply -f mongo-deploy.yaml -n node-mongo-istio
kubectl apply -f nodejsapp-deploy.yaml -n node-mongo-istio

kubectl apply -f mongo-service.yaml -n node-mongo-istio
kubectl apply -f node-service.yaml -n node-mongo-istio

 kubectl apply -f gateway-nodejs.yaml  -n node-mongo-istio
```

Verify that the service has been created using

```
azureuser@istio-practice:~$ kubectl -n istio-system get service istio-ingressgateway
NAME                   TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)
                    AGE
istio-ingressgateway   LoadBalancer   10.96.160.94   <pending>     15021:31031/TCP,80:32281/TCP,443:30942/TCP,31400:31668/TCP,15443:30901/TCP   43m
```

You can now request the following 

```
 INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
```
Get the IP using  `MINIKUBE_IP=$(minikube ip)`

Now you can do curl requests. 
```
azureuser@istio-practice:~$ curl http://$MINIKUBE_IP:$INGRESS_PORT
Hello NODE API
```

You can even use the API externally. 

In separate terminal run the following 

```
 kubectl -n istio-system port-forward service/istio-ingressgateway 8080:80
```

In another terminal use  `curl http://localhost:8080` . 

## Canary Rollout

```
kubectl create ns node-mongo-istio
kubectl label namespace node-mongo-istio istio-injection=enabled

cd istio/request_routing

kubectl apply -f mongo-deploy.yaml -n node-mongo-istio
kubectl apply -f nodejs-dev-deploy.yaml -n node-mongo-istio
kubectl apply -f nodejs-prod-deploy.yaml -n node-mongo-istio

kubectl apply -f mongo-service.yaml -n node-mongo-istio
kubectl apply -f nodejs-service.yaml -n node-mongo-istio

kubectl apply -f destination-rule.yaml -n node-mongo-istio
kubectl apply -f virtual-service.yaml  -n node-mongo-istio
```


