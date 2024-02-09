# SOLUTION

## Http API 1

- Simple nodejs http api that is external to be accessed over the internet.
- code is in `http-api1` folder
- Has three endpoints
    1. `/api1` - returns simple response 'OK from API1'
    2. `/api1/db` - connects to mysql database and returns - 'OK from API1 DB: ${database_name}'
    3. `/api1/api2` - connects to internal http api 2 at `/api2` and returns - 'OK from API1 and ${response_from_api2}'
 
## Http API 2

- Simple nodejs http api that is internal to be accessed from http api 1.
- code is in `http-api2` folder
- Has one endpoint
    1. `/api1` - returns simple response 'OK from API2'

 ## Infra

 - `infra` folder contains terraform code to create EKS cluster in aws.
 - Creates following resources
    1. AWS EKS cluster
    2. AWS ECR repository
    3. VPC, subnets, networking components
    4. IAM roles and policies
 - steps to run
     ```
     cd infra
     terraform init
     terraform plan
     terraform apply --auto-approve
     ```
 - EKS cluster name can be obtained from `terraform output`

## Docker

  - `http-api1` and `http-api-2` folders has Dockerfiles to build docker images for respective http api 1 and http api 2.

## Kubernetes

  - `k8s` folder has kubernetes manifest yaml files that deploys the following objects.

    1. `api1 deployment` and `api1 service` as `loadbalancer` so that it can be accessed over the internet.
    2. `api2 deployment` and `api2 service` of type `cluster ip` so that it can be accessed from api1.
    3. `mysql deployment` and service of type `cluster ip` so that it can be accessed from api1.
    4. `fluentd` deployment so that container logs can be streamed to `cloudwatch`.
   
  - steps to run

    ```bash
    cd k8s
    aws eks update-kubeconfig --region us-east-1 --name education-eks-OavGBBOG
    kubectl apply -f .
    ```

## CI CD Pipelines

  - `Github Actions` is being used as CI CD pipeline.
  - AWS access key and secret are added in github actions secrets as prerequisite.
  - There are two pipelines
    1. `deploy-http-api1.yml` that is triggered when any change is made to `http-api1` folder and build docker image fot http api 1 and pushed the image to ECR. Then deploys the new image to EKS cluster.
    2. `deploy-http-api2.yml` that is triggered when any change is made to `http-api2` folder and build docker image fot http api 2 and pushed the image to ECR. Then deploys the new image to EKS cluster.
   
## Logs

  - EKS container logs are streamed to cloudwatch using fluentd and users can view the streaming logs in cloudwatch dashboard.

## Test the apis

### HTTP API 1

```bash
$ curl -v http://af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com/api1
*   Trying 34.203.162.116:80...
* Connected to af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com (34.203.162.116) port 80 (#0)
> GET /api1 HTTP/1.1
> Host: af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com
> User-Agent: curl/7.81.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 12
< ETag: W/"c-rloaaiZeLOifXlyTrfgMG0fUG+w"
< Date: Fri, 09 Feb 2024 08:44:44 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com left intact
OK from API1

$ curl -v http://af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com/api1/db
*   Trying 54.164.101.24:80...
* Connected to af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com (54.164.101.24) port 80 (#0)
> GET /api1/db HTTP/1.1
> Host: af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com
> User-Agent: curl/7.81.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 27
< ETag: W/"1b-rBP4POqrgr37lb8qpdKfigdq9VY"
< Date: Fri, 09 Feb 2024 08:44:49 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com left intact
OK from API1 DB: mydatabase

$ curl -v http://af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com/api1/api2
*   Trying 54.164.101.24:80...
* Connected to af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com (54.164.101.24) port 80 (#0)
> GET /api1/api2 HTTP/1.1
> Host: af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com
> User-Agent: curl/7.81.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 29
< ETag: W/"1d-SrLlGdbv8GakaDDwV104QwHva4k"
< Date: Fri, 09 Feb 2024 08:44:52 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host af0cad9f9bfa4438287a0497fb12038d-17889581.us-east-1.elb.amazonaws.com left intact
OK from API1 and OK from API2
```

  
         
          
        
         
         
