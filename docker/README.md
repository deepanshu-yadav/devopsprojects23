## Docker

The app is run inside docker container. However instead of running nodejs and mongodb inside the same container they are run in separate container.  

Install docker using  `./install_docker_minikube.sh` . This script is avaialable in the main directory. 

Then run `sudo apt install -y docker-compose`

Now you can use docker compose.
Run the command `docker-compose build` and then `docker-compose up` . Exit by `docker-compose down` .

Note it first build the docker images and the runs them.
The Dockerfile for each of the nodejs and mongodb are avaiable in their respective folders.

After running docker compose you can test them as below.

```
azureuser@deepanshudevops:~/exp/data$ curl -sX GET http://localhost:3000
Hello NODE 
```

To send a POST request run this
```
 curl --header "Content-Type: application/json"   --request POST   --data '{"name":"xyz","quantity":"1", "price": "20"}'   http://localhost:3000/products
```