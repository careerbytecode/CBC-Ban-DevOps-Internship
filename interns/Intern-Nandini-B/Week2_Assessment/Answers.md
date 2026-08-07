Q: What is Docker, and why has it become one of the most preferred tools for DevOps Engineers?

Ans: Docker is a containerization platform tool that packages applications and all their dependencies into lightweight, portable containers.

Docker become one of the most preferred tools for DevOps Engineers:

Containers are lightweight compared to VMs, enabling efficient scaling. Every dependency, library, and config is packaged inside the container image. Perfect fit for microservices architectures It Supports both hybrid and multi-cloud strategies(AWS, Azure, GCp, On-priemises) Docker runs on all the environments(DEv, Testing, Production, cloud)

Q: Explain the concept of containerization and why it is important for building and shipping modern applications.

Ans:
Containerization is the practice of packaging an application together with all its dependencies, libraries, configuration files, and runtime environment into a single, lightweight unit called a container.

Docker is important for building and shipping modern applications due to

Docker runs on every where. We don't need to worry about it worked on my computer but not on the prod server. Developers can build, test, and ship apps quickly because containers start in seconds. It's easy to scale up container if no.of users are spin up Containers are lightweight compared to virtual machines, so you can run more apps on the same hardware.

Q: Describe the flow of how the Docker Client, Docker Daemon, and Docker Registry interact when you run docker run nginx.

Ans: Docker Client: Docker Client is like front desk that talks to Daemon and passes the command to it.

Docker Daemon: Docker Daemon received the request from the client and it checks whether the requested image is present in the system or not. If yes It uses the existing image to create and run the container If not then it talks to the Docker registry and fetches the requested image to create and run the container

Docker Registry: It the place whether the downloaded are stored. It receives the request from the Daemon and It pulls the requested image from registry. The downloaded image stores in the system to create and run the container.

Q: Write the Docker commands to perform the following:

Ans: Display the Docker version----- Docker --version Pull the ubuntu image--- Docker pull  eg: Docker pull ubuntu Run an interactive Ubuntu container----- Docker run -d --name  eg: Docker run -d --name web1 ubuntu Display all containers (running and stopped)----- Docker ps Remove all stopped containers------ Docker rm eg: docker rm web1

Q: Explain the difference between the COPY and ADD instructions in a Dockerfile.

Ans; Copy: It is used to simply copy the file to the destination CMD: copy

eg: copy file1 /usr/share/nginx/html/

ADD: It is also used to copy the file but with an extra power such as download or auto-extract. If the source file is an url then it downloads the file or if the source file is the tar file then it extracts the file automatically.

Cmd: ADD /usr/share/nginx/html/

eg: ADD file.tar /usr/share/nginx/html/

Q: Why do we need Docker Volumes? Explain what happens to container data when a container is deleted without a volume.

Ans: By default docker container stores the data temporarily. Whenever we stopped or deleted the container the data stored inside will get deleted. So, We need a volume to stores the data permanently until we delete it.

Q: What is Docker Compose and why is it useful when working with multiple containers?

Ans: Docker Compose is a tool that lets you define and run multiple containers together using a single configuration file (docker-compose.yml).

Instead of starting each container one by one with separate docker run commands, you describe all your services (like a web server, database, cache) in the YAML file, and Docker Compose brings them up with a single command:

docker-compose up

Modern applications need several services working together. For example:

A web app (Node.js, Python, etc.)

A database (MySQL, PostgreSQL) etc..

Running all these services on different containers are difficult to manage so we need Docker Compose to run all these servies together to run an application successfully.

Q: Why do we need Kubernetes? Explain the problems it solves that Docker alone cannot.

Ans: Docker can run container on a single machine at a time but Kubernetes can runs on multiple machines. Dicker cannot do scaling, load balancing and self healing, Roll backs or updates but a Kubernetes can do.

Kubernetes scales the no.of containers that handles the application based on the traffic automatically. Kubernetes distributes the traffic equally to all the containers but docker cannot Kubernetes finds the failed container and it replace it with the new running container Kubernetes updates the application to the newer version and it rollbacks to the previous version if any issue a raises.

Q: What is a Pod? Explain why Kubernetes uses Pods instead of directly running containers.

Ans: A Pod is a small deployable unit in Kubernetes. It's a wrapper around the container's, it stores multiple containers, network, storageetc inside it. Kubernetes cannot run the container the without pod.

In a real world, an application requires multiple containers to work together and need to share network, libraries and storage etc... A pod can provides all these requirements to the containers and make they can wok together.

Q: What is an Ingress, and in what situation would you choose it over a LoadBalancer Service?

Ans: In Kubernetes, an Ingress is a resource that manages external access to services inside the cluster, usually HTTP/HTTPS traffic. It looks at the incoming request (like the URL or hostname) and decides which service should handle it.

Q: We used Ingress in the below situations:

Ans: Wanted to route traffic based on domain name and Path etc.. Instead of creating a separate Load Balancer for each service (which costs more), you can use one Ingress to route traffic to many services. Want to handle SSL certificates and HTTPS termination

Q: Basically Grafana provides the visual representation of the resources like CPU, Memory, Disk Consumption, Request rate, Networks etc...

Ans: Grafana can give graphical representation as Per/ pd too.

It helps team members to analyze the resourrces in a clear and simple manner and in a few seconds to minutes.

Grafana integrates with Prometheus and Loki to trigger alerts when thresholds are crossed (e.g., CPU throttling, memory saturation).

Alerts can link directly to dashboards and runbooks for quick fixes.

Q: Write a Dockerfile that installs and runs a simple application, then explain how you would build and run it.

Ans:

Dockerfile:

Use an official lightweight Python image
FROM python:3.10-slim

Set working directory inside the container
WORKDIR /app

Copy application files into the container
COPY requirements.txt requirements.txt COPY app.py app.py

Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

Expose port 5000 for the Flask app
EXPOSE 5000

Command to run the application
CMD ["python", "app.py"]

Required files:
1.Requirments.txt:

flask

2.app.py

from flask import Flask

app = Flask(name)

@app.route("/") def hello(): return "Hello from Docker!"

if name == "main": app.run(host="0.0.0.0", port=5000)

Using the above dockerfile and the required files9requirment.txt and app.py0 files have created an simple application

Then have created a custom docker image which is an extension to the base python image in the dockerfile by using the below command

docker build -t my-flask-app .

my-flask-app is name of the my custom image . is the context)current directory) of the image means everything should be created and run in the current working directory

Next I ran the container to host my application and expose the traffic on this container to the ports 5000:5000 on the current working machine and port inside the container respectively by using the below command

docker run -p 5000:5000 my-flask-app

Finally I able to access the application by using the below command on my local browser

http://localhost:5000

(which pods should run, how many replicas, what resources they need).

Q: Explain the role of the following Kubernetes components: Control Plane Worker Node kubelet Scheduler Controller Manager

Ans: Control plane: It is a brain of the cluster, It ensures the desired state of the cluster(which pods should run, how many replicas, what resources they need)

Worker Node: These are the physical server or vm's which provides a resources like CPU, Memory,netwrok,storage etc Application or containers runs on this worker nodes

Kubelet: It's a nodelevel working agent. It start and run the containers It Checks the pod specifications assigned to node Reports node and pod state to the control plane

Scheduler: It decides which pod should assign to the which node and decides the best node based on available cpu, memory, etc...

Controller manager: It matches the desired and the current state of the luster It ensures the required no.of pods and running using replicas Finds the node failure

Q: Write a Deployment manifest for an nginx application with 2 replicas, and explain how Kubernetes maintains the desired number of Pods.

Ans: Manifest file:

apiVersion: apps/v1 kind: Deployment metadata: name: nginx-deployment spec: replicas: 2 selector: matchLabels: app: nginx template: metadata: labels: app: nginx spec: containers: - name: nginx image: nginx:latest ports: - containerPort: 80

The replica set ensure the required no.of runs at all the time in the way as

Controller manager starts the replica set controller. Then replica set controller checks the current state aganist the desired state mentioned in the manifest file and ensures that 2 pods are running at every time. If we scale up the replicas then replica set controller add a fewer pods to ensure the required no.of pods are running at every time. If we scale down the replicas to 1 then replica set controller delete 1 pod and ensures 1 pod is running at every time.

Q: If a Pod is running but you cannot access it from outside the cluster, you need a Service of type NodePort or LoadBalancer.

Ans: NodePort: Exposes the application on a port of each node’s IP, so you can reach it externally via :. LoadBalancer: On cloud providers, automatically provisions an external load balancer with a public IP.

Manifest file:

apiVersion: v1 kind: Service metadata: name: nginx-service spec: type: NodePort selector: app: nginx ports: - port: 80 # Service port (inside cluster) targetPort: 80 # Container port nodePort: 30080 # External port on each node (range: 30000–32767)

Working:

The Service selects Pods with label app: nginx.

Requests to http://:30080 are forwarded to one of the Nginx Pods.

Kubernetes ensures load balancing across the 2 replicas.

If a Pod dies, the Service automatically routes traffic only to healthy Pods.

Q: Explain how you would store a database password securely in Kubernetes and inject it into a Pod.

Ans: We use secrets in Kubernetes to store the password or any sensitive data in encrypted format(base64) and we used to refer this secret in deployment as an environment variable.

Steps:

firs we should create a secret manifest file to store the sensitive data.
next we should create a deployment manifest and refer secret as env variable
Before referencing teh secret we should encrypt the sensitive data in the base64 format and store it in teh secret manifst file by using the below command
echo -n | base64 eg:echo -n "password123" | base64

Secret manifest:

apiVersion: v1 kind: Secret metadata: name: db-secret type: Opaque data: db-password: cGFzc3dvcmQxMjM= # base64 for "password123"

Deployment manifest file:

apiVersion: apps/v1 kind: Deployment metadata: name: app-deployment spec: replicas: 1 selector: matchLabels: app: myapp template: metadata: labels: app: myapp spec: containers: - name: myapp image: myapp:latest env: - name: DB_PASSWORD valueFrom: secretKeyRef: name: db-secret key: db-password

Q: Your application receives sudden high traffic. Explain how the Horizontal Pod Autoscaler would help and what it needs to work.

Ans: Horizontal Pod Autoscaler is used to auto scale the no.of pods based on the resources like CPU, Memory etc.. Whenever there is an increase in traffic the HPA scales up the pods count and whenever there is a decrease in traffic the HPA scales down the pods count to save the resources.

We can scales the pods count by HPA using a simple kubectl command or by using a manifest file

kubectl autoscale deployment nginx-deployment --cpu-percent=70 --min=2 --max=10

In the above command HPA ensures that min of 2 pods runs at every time and scales pods count up to 10 based on the CPU when it reaches 70%

HPA manifest file:

apiVersion: autoscaling/v2 kind: HorizontalPodAutoscaler metadata: name: nginx-hpa spec: scaleTargetRef: apiVersion: apps/v1 kind: Deployment name: nginx-deployment minReplicas: 2 maxReplicas: 10 metrics:

type: Resource resource: name: cpu target: type: Utilization averageUtilization: 70
Q: Research any three real-world use cases of Docker in companies and explain them briefly.

Ans: Docker is used by companies worldwide to solve real problems like scaling apps, speeding up development, and ensuring consistent environments

Three Real-World Use Cases of Docker

Netflix – Scaling Microservices
Problem: Netflix runs thousands of microservices globally. Traditional virtual machines slowed scaling and deployments.

Docker Use: They containerized microservices with Docker and orchestrated them using Kubernetes.

Benefit: Faster deployments, easy scaling during peak traffic (like new show releases), and reduced downtime.

Impact: Netflix can deliver content seamlessly to millions of users without service interruptions.

PayPal – Developer Productivity
Problem: Developers faced inconsistent environments, causing bugs and slow onboarding.

Docker Use: Standardized dev, test, and production environments using Docker containers.

Benefit: Onboarding time reduced from days to hours, fewer deployment issues, and smoother testing.

Impact: PayPal improved developer efficiency and reduced production errors significantly.

Spotify – Continuous Integration (CI/CD)
Problem: Multiple teams working on a huge codebase needed clean builds and quick feedback.

Docker Use: Integrated Docker into their CI/CD pipeline, running tests in isolated containers.

Benefit: Reproducible builds, faster testing, and quicker feature releases.

Impact: Spotify can release new features rapidly while maintaining stability across its platform.
