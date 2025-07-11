
# 🧾 BidStream - MERN Bidding App Deployment Guide (GKE + Kubernetes Dashboard)

This guide walks you through the steps taken to deploy the **BidStream** MERN-based bidding application to a **GKE Kubernetes Cluster** using:
- Docker + Kubernetes manifests
- Kubernetes Dashboard (exposed via LoadBalancer)
- Manual deployment (No GitOps, No Helm, No ArgoCD used)
---

## 📁 Project Structure

```
BidStream/
├── backend/                  # Express API (Node.js)
│   ├── .env.docker           # Example backend environment config
│   └── Dockerfile
├── frontend/                 # React App (Vite)
│   ├── .env.docker           # Example frontend environment config
│   └── Dockerfile
├── k8s/                      # Kubernetes YAMLs
│   ├── backend-deployment.yaml
│   ├── backend-secret.yaml
│   ├── frontend-deployment.yaml
│   ├── ingress.yaml
│   └── cluster-issuer.yaml
└── .gitignore                # Ignores .env.docker, dist/, node_modules/
```

---

## 🧪 Sample .env.docker Files (Development vs Production)

### 🔧 backend/.env.docker (Development)

```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET_KEY= <your_secret>
PORT=5000
FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:5000
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_HOST=smtp.gmail.com
SMTP_MAIL=<your_mail_id>
SMTP_PASSWORD=< mail_id_app_password> 
```

### 🌐 backend/.env.docker (Production)

```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET_KEY=<your_secret>
PORT=5000
FRONTEND_URL=https://piyush-web-app.co.in                                                //use_your_domain
VITE_BACKEND_URL=https://piyush-web-app.co.in                                            //use_your_domain
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_HOST=smtp.gmail.com
SMTP_MAIL=<your_mail_id>
SMTP_PASSWORD=< mail_id_app_password> 
```

### 🔧 frontend/.env.docker (Development)

```
VITE_BACKEND_URL=http://localhost:5000
```

### 🌐 frontend/.env.docker (Production)

```
VITE_BACKEND_URL=https://piyush-web-app.co.in
```

> ⚠️ **Note**: In production, ensure that your domain (e.g. `piyush-web-app.co.in`) is pointed to your GKE LoadBalancer IP via DNS A-record.

---

## 🔨 Step 0: Build and Push Docker Images to GCR

Make sure you're authenticated with GCR:

```bash
gcloud auth configure-docker
```

### 📦 Backend

```bash
cd Mern_bidding_BidStream/backend

# Use .env.docker when building
cp .env.docker .env

docker build -t gcr.io/YOUR_PROJECT_ID/backend:latest .
docker push gcr.io/YOUR_PROJECT_ID/backend:latest
```

### 🖥️ Frontend

```bash
cd Mern_bidding_BidStream/frontend

# Use .env.docker when building
cp .env.docker .env

docker build -t gcr.io/YOUR_PROJECT_ID/frontend:latest .
docker push gcr.io/YOUR_PROJECT_ID/frontend:latest
```

✅ Now update the image names in:

- `k8s/backend-deployment.yaml`
- `k8s/frontend-deployment.yaml`

---

## 📥 Step 1: Install NGINX Ingress Controller via Helm

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm upgrade --install ingress-nginx ingress-nginx   --namespace ingress-nginx --create-namespace   --set controller.service.type=LoadBalancer
```

After a few seconds, run:

```bash
kubectl get svc -n ingress-nginx
```

Use the `EXTERNAL-IP` of the `ingress-nginx-controller` service to map your domain.
#### example 

```bash
NAME                                 TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.12.4.113    34.173.73.104   80:31837/TCP,443:31457/TCP   12m
ingress-nginx-controller-admission   ClusterIP      10.12.1.150    <none>          443/TCP                      12m
```

### 🌐 Point Domain to Your GKE LoadBalancer (A Record)
Once you get the EXTERNAL-IP from:

bash
Copy
Edit
kubectl get svc -n ingress-nginx
Add that IP as an A Record in the DNS settings of your domain provider (e.g., GoDaddy, Namecheap, Google Domains):

✅ Steps:
Go to your domain provider's DNS Management section.

Add a new A Record:

Host/Name: @ (or www, or leave empty depending on your provider)

Type: A

Value: <EXTERNAL-IP> (e.g., 34.173.73.104)

TTL: Default or 600 seconds

Save the record.

🔁 It may take a few minutes (up to 24 hours) for DNS propagation.

```bash🔎 Example:
Type	Name	Value	TTL
A	@	34.173.73.104	600
```
This will make your app accessible at your custom domain, e.g., https://piyush-web-app.co.in or the domain of your choice.

---

## 🚀 Step 2: Deploy the App to GKE

### 🔒 2.1 Create Kubernetes Secrets k8s/backend-secrets.yaml
```
apiVersion: v1
kind: Secret
metadata:
  name: backend-secrets
  namespace: default
type: Opaque
stringData:
  MONGO_URI: <your_mongodb_connection_string>
  JWT_SECRET_KEY: <your_secret>
  CLOUDINARY_API_KEY: <your_api_key>
  CLOUDINARY_API_SECRET: <your_api_secret>
  SMTP_PASSWORD: <mail_id_app_password>
```
### Edit k8s/backend-config.yaml
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: backend-config
  namespace: default
data:
  PORT: "5000"
  COOKIE_EXPIRE: "7"
  JWT_EXPIRE: "7d"
  FRONTEND_URL: "https://piyush-web-app.co.in"                                  //use_your_domain
  VITE_BACKEND_URL: "https://piyush-web-app.co.in"                              //use_your_domain:
  CLOUDINARY_CLOUD_NAME: "your_cloudinary_cloud_name"
  SMTP_SERVICE: "gmail"
  SMTP_PORT: "465"
  SMTP_HOST: "smtp.gmail.com"
  SMTP_MAIL: "your_email_id"

```

### ⚙️ 2.2 Apply Deployments

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

### 🌐 2.3 Apply Ingress
```bash
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: piyush-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "false"
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - piyush-web-app.co.in                                         //use_your_domain
      secretName: piyush-web-app-tls                                   //change_secret_name
  rules:
    - host: piyush-web-app.co.in
      http:
        paths:
          - path: /.well-known/acme-challenge
            pathType: ImplementationSpecific
            backend:
              service:
                name: frontend-service
                port:
                  number: 80

          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 5000

          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
```

```bash
kubectl apply -f k8s/ingress.yaml
```

---

## Install ArgoCD 
follow the documentation --> https://argo-cd.readthedocs.io/en/stable/getting_started/

Patch and expose the service to LoadBalancer & Access the ArgoCD UI ,Generate password and Login 

### Create App or use yaml given below
```bash
kubectl apply -f - <<EOF
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: bidstream
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
    targetRevision: main
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
EOF
```
<img width="2542" height="1283" alt="argocd" src="https://github.com/user-attachments/assets/f70b4ddf-4a84-4b91-8fc0-8a9056a3ecdb" />


## 🖥️ Kubernetes Dashboard Setup

### 📦 Deploy Kubernetes Dashboard

You used the latest dashboard deployment and exposed it:

```bash
kubectl patch svc kubernetes-dashboard -n kubernetes-dashboard   -p '{"spec": {"type": "LoadBalancer"}}'
```

### 🔑 Create Admin Token

```bash
kubectl create serviceaccount admin-user -n kubernetes-dashboard

kubectl create clusterrolebinding admin-user-binding   --clusterrole=cluster-admin   --serviceaccount=kubernetes-dashboard:admin-user

kubectl -n kubernetes-dashboard create token admin-user
```

Then access it at:

```
https://<dashboard-lb-ip>:443
```

---

## 🧩 Final App Access

- **Frontend App**: https://piyush-web-app.co.in or LoadBalancer IP
- **K8s Dashboard**: https://<dashboard-lb-ip>:443 → login with token

---

## 🛠️ Common Commands

```bash
kubectl get all
kubectl get svc -A
kubectl describe ingress
kubectl logs -f <pod-name>
kubectl delete -f <yaml>
kubectl delete ns <namespace>
```

---

## 📝 Summary

- ✅ Dockerized and pushed images to GCR
- ✅ Installed NGINX Ingress via Helm
- ✅ Configured secrets, deployments, ingress
- ✅ Exposed Dashboard via LoadBalancer
- ✅ Environment separation: dev vs prod
- ❌ No Helm/ArgoCD/GitOps tools used

---

## 📜 License

MIT – Free to use & modify.  in this file add clusterissue apply too after ingress.yaml apply for ssl ceification also add steps to implenmt argocd and for creating app its in deafult namespace application named bidstream and kubentes directory is k8s write all steps for creating applicationadna installtionsteps loginng steps altoghrther 
