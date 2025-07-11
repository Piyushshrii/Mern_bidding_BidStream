# 🧾 BidStream - MERN Bidding App Deployment Guide (GKE + Kubernetes Dashboard + Argo CD)

This guide walks you through the steps taken to deploy the **BidStream** MERN-based bidding application to a **GKE Kubernetes Cluster** using:
- Docker + Kubernetes manifests
- Kubernetes Dashboard (exposed via LoadBalancer)
- Ingress with TLS using Let's Encrypt
- Optional: GitOps deployment with Argo CD

---

## 📁 Project Structure

BidStream/
├── backend/
│ ├── .env.docker
│ └── Dockerfile
├── frontend/
│ ├── .env.docker
│ └── Dockerfile
├── k8s/
│ ├── backend-deployment.yaml
│ ├── backend-secret.yaml
│ ├── backend-config.yaml
│ ├── frontend-deployment.yaml
│ ├── ingress.yaml
│ └── cluster-issuer.yaml
└── .gitignore

yaml
Copy
Edit

---

## 🧪 Sample .env.docker Files

> See earlier section in this README for example `.env.docker` templates for dev and prod.

---

## 🔨 Step 0: Build and Push Docker Images to GCR

```bash
gcloud auth configure-docker
Backend
bash
Copy
Edit
cd backend
cp .env.docker .env
docker build -t gcr.io/YOUR_PROJECT_ID/backend:latest .
docker push gcr.io/YOUR_PROJECT_ID/backend:latest
Frontend
bash
Copy
Edit
cd frontend
cp .env.docker .env
docker build -t gcr.io/YOUR_PROJECT_ID/frontend:latest .
docker push gcr.io/YOUR_PROJECT_ID/frontend:latest
Update image URLs in:

k8s/backend-deployment.yaml

k8s/frontend-deployment.yaml

📥 Step 1: Install NGINX Ingress Controller via Helm
bash
Copy
Edit
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm upgrade --install ingress-nginx ingress-nginx \
  --namespace ingress-nginx --create-namespace \
  --set controller.service.type=LoadBalancer
Get EXTERNAL-IP:

bash
Copy
Edit
kubectl get svc -n ingress-nginx
Example:

pgsql
Copy
Edit
NAME                     TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)                      AGE
ingress-nginx-controller LoadBalancer   10.12.4.113    34.173.73.104   80:31837/TCP,443:31457/TCP   12m
🌐 Map Domain to LoadBalancer IP (A Record)
Go to your DNS provider and add:

Type	Name	Value	TTL
A	@	34.173.73.104	600

After DNS propagation, your app will be available at https://your-domain.com

🚀 Step 2: Deploy App to GKE
🔒 2.1 Apply Secrets & ConfigMap
k8s/backend-secrets.yaml
yaml
Copy
Edit
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
k8s/backend-config.yaml
yaml
Copy
Edit
apiVersion: v1
kind: ConfigMap
metadata:
  name: backend-config
  namespace: default
data:
  PORT: "5000"
  COOKIE_EXPIRE: "7"
  JWT_EXPIRE: "7d"
  FRONTEND_URL: "https://piyush-web-app.co.in"
  VITE_BACKEND_URL: "https://piyush-web-app.co.in"
  CLOUDINARY_CLOUD_NAME: "your_cloudinary_cloud_name"
  SMTP_SERVICE: "gmail"
  SMTP_PORT: "465"
  SMTP_HOST: "smtp.gmail.com"
  SMTP_MAIL: "your_email_id"
Apply them:

bash
Copy
Edit
kubectl apply -f k8s/backend-secrets.yaml
kubectl apply -f k8s/backend-config.yaml
⚙️ 2.2 Apply Deployments
bash
Copy
Edit
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
🔐 2.3 Setup TLS Certificate via Let's Encrypt
k8s/cluster-issuer.yaml
yaml
Copy
Edit
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
Apply it:

bash
Copy
Edit
kubectl apply -f k8s/cluster-issuer.yaml
🌐 2.4 Apply Ingress
Make sure your k8s/ingress.yaml is updated and then run:

bash
Copy
Edit
kubectl apply -f k8s/ingress.yaml
🖥️ Step 3: Kubernetes Dashboard Setup
bash
Copy
Edit
kubectl patch svc kubernetes-dashboard -n kubernetes-dashboard \
  -p '{"spec": {"type": "LoadBalancer"}}'

kubectl create serviceaccount admin-user -n kubernetes-dashboard

kubectl create clusterrolebinding admin-user-binding \
  --clusterrole=cluster-admin \
  --serviceaccount=kubernetes-dashboard:admin-user

kubectl -n kubernetes-dashboard create token admin-user
Access at:

cpp
Copy
Edit
https://<dashboard-lb-ip>:443
🚀 Step 4 (Optional): GitOps with Argo CD
🧰 4.1 Install Argo CD
bash
Copy
Edit
kubectl create namespace argocd

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
Expose Argo CD via port-forward:

bash
Copy
Edit
kubectl port-forward svc/argocd-server -n argocd 8080:443
Visit:

arduino
Copy
Edit
https://localhost:8080
🔐 4.2 Login to Argo CD
Get the initial admin password:

bash
Copy
Edit
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo
Login using:

Username: admin

Password: (from above)

⚙️ 4.3 Create Argo CD App for BidStream
bash
Copy
Edit
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
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
EOF
🧩 Final App Access
Frontend App: https://piyush-web-app.co.in or LoadBalancer IP

K8s Dashboard: https://<dashboard-lb-ip>:443 → login with token

Argo CD: https://localhost:8080 (via port-forward)

🛠️ Useful Commands
bash
Copy
Edit
kubectl get all
kubectl get svc -A
kubectl describe ingress
kubectl logs -f <pod-name>
kubectl delete -f <yaml>
kubectl delete ns <namespace>
kubectl get applications -n argocd
