## Pre-requisites
Make sure the cluster is running.

If not start the cluster using 
```
 minikube start  --memory 12000  --cpus 2
```

Install istio using this [link](https://istio.io/latest/docs/setup/getting-started).

We can use istio using two ways one is simple deployment and other is canary rollout.


In simple we let every other request pass through istio and then through kubernetes.


In canaray rollout we have two deployments one is production(prod) and other is development.
We pass the 20 percent of the network traffic to development and 80 percent to prod. 
Later we can increase the traffic steadily and fully route the traffic to prod.

## Simple deployment

Create namespaces.
```
kubectl create ns node-mongo-istio
kubectl label namespace node-mongo-istio istio-injection=enabled
```

Now fo to simple directory `cd simple`

Now type the following commands.

```
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

Create namespaces.
```
kubectl create ns node-mongo-istio
kubectl label namespace node-mongo-istio istio-injection=enabled
```

Now do  
`cd request_routing`

Now apply the following 
```
kubectl apply -f mongo-deploy.yaml -n node-mongo-istio
kubectl apply -f nodejs-dev-deploy.yaml -n node-mongo-istio
kubectl apply -f nodejs-prod-deploy.yaml -n node-mongo-istio

kubectl apply -f mongo-service.yaml -n node-mongo-istio
kubectl apply -f nodejs-service.yaml -n node-mongo-istio

kubectl apply -f destination-rule.yaml -n node-mongo-istio
kubectl apply -f virtual-service.yaml  -n node-mongo-istio
```


