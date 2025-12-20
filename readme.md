🚀 Deploying WebApp-Class39 Using Jenkins and Docker Swarm

This guide provides step-by-step instructions on how to deploy the webapp-class39 application to a Docker Swarm cluster running on an EC2 Linux host using a Jenkins CI/CD pipeline.

The process includes:

Source code checkout

Docker image build and push to Docker Hub

Secure file transfer to EC2

Swarm deployment using docker stack deploy

📦 Prerequisites
1️⃣ Infrastructure Requirements
Component	Description
EC2 instance	Amazon Linux / Ubuntu with Docker + Swarm configured
Docker Swarm	Must be initialized (docker swarm init)
Jenkins	Accessible with agent capable of running Docker
Docker Hub	Repository for storing built images
2️⃣ Software on EC2

Install Docker & enable swarm:

sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

docker swarm init

3️⃣ Jenkins Requirements

Jenkins must have:

Docker installed & running

SSH agent capability

Credentials configured:

Jenkins Credentials Needed
ID	Type	Purpose
dockerhub-credentials	Username + Password	Push image to Docker Hub
ec2-ssh-key	SSH private key	Connect to EC2 host
⚙️ Docker Hub Repository

Example:

ndiforfusi/webapp-class39


Update the Jenkinsfile if using a different image name.

🧰 CI/CD Pipeline Workflow
Trigger pipeline

The pipeline runs automatically when:

Code is pushed to a branch (default: main, development)

Or triggered manually in Jenkins

Stages Overview
Stage	Description
Checkout	Pull latest code from repo
Set Tag	Determine Docker image tag
Build & Push	Build container & push to Docker Hub
Copy Compose File	Transfer docker-compose.yaml to EC2
Swarm Deploy	Pull updated image & deploy via Docker Swarm
🧱 Jenkinsfile Summary

The Jenkins pipeline:

Builds the Docker image

Pushes to Docker Hub

SCP’s docker-compose.yaml to EC2

SSH’s into EC2 and executes:

docker pull ndiforfusi/webapp-class39:<TAG>
docker stack deploy -c docker-compose.yaml web-app


Result:

Application updates instantly

Previous stack services replaced seamlessly

📁 Docker Compose Example

Your docker-compose.yaml should resemble:

version: "3.8"

services:
  web:
    image: ndiforfusi/webapp-class39:4.0.0
    ports:
      - "8080:80"
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure

🌐 Accessing the Application

Once deployed:

http://<EC2_PUBLIC_IP>:8080


or

http://<LoadBalancerOrDomainName>

🔐 Security Notes

Do not hardcode passwords or private keys

Store sensitive values in Jenkins Credentials

Restrict SSH access to trusted IPs/security groups

🧩 Troubleshooting
Common Issues
❌ SSH Permission Denied

Ensure:

Correct .pem mapped to Jenkins

EC2 security group allows port 22

User = ec2-user or correct OS user

❌ Docker push fails

Check:

dockerhub-credentials exist

Token/password correct

❌ Deployment doesn’t update

Confirm:

docker service ls
docker service ps web-app
docker logs <container>

🔄 Redeploying

Simply:

push a commit

or manually run the pipeline in Jenkins

To force redeployment:

docker stack deploy -c docker-compose.yaml web-app

🎯 Summary

With this setup, you achieve:

Continuous Integration using Jenkins

Continuous Delivery to Docker Swarm on EC2

Secure, repeatable, versioned deployments

Automatic rollout using docker stack