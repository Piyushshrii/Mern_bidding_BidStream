
# 🧾 BidStream - MERN Bidding App Deployment Guide (GKE + Kubernetes Dashboard)

This guide walks you through the steps taken to deploy the **BidStream** MERN-based bidding application to a **GKE Kubernetes Cluster** using:
- Kubernetes manifests
- Kubernetes Dashboard (exposed via LoadBalancer)
- Manual deployment (No GitOps, No Helm, No ArgoCD used)

---

## 📁 Project Structure

```
BidStream/
├── backend/                  # Express API (Node.js)
│   └── .env.docker
├── frontend/                 # React App (Vite)
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

## 🚀 Deployment Steps

### 1. 🔒 Create Kubernetes Secrets

```bash
kubectl create secret generic backend-secrets \
  --from-literal=MONGO_URI='your-mongo-uri' \
  --from-literal=JWT_SECRET_KEY='your-jwt-key' \
  --from-literal=EMAIL_USER='xyz@gmail.com' \
  --from-literal=EMAIL_PASS='secure-pass'
```

---

### 2. 📦 Deploy Backend and Frontend

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

---

### 3. 🌐 Ingress Setup

```bash
kubectl apply -f k8s/ingress.yaml
```

> You used `VITE_BACKEND_URL` and `FRONTEND_URL` pointing to the domain/IP exposed via NGINX Ingress.

---

### 4. 🖥️ Kubernetes Dashboard Access

You exposed the dashboard with:

```bash
kubectl patch svc kubernetes-dashboard -n kubernetes-dashboard \
  -p '{"spec": {"type": "LoadBalancer"}}'
```

Get the external IP:

```bash
kubectl get svc -n kubernetes-dashboard
```

Access the dashboard via:

```
https://<EXTERNAL-IP>:443
```

Login with `kubeconfig` or token:

```bash
kubectl -n kubernetes-dashboard create token admin-user
```

---

### 5. ❌ Optional Tools (NOT USED)

You **did not** use:
- Argo CD
- Helm Charts
- Loki/Grafana/OpenSearch (all removed)

---

## ✅ Useful Commands

```bash
kubectl get all
kubectl get svc -A
kubectl delete ns <namespace>
kubectl describe ingress
kubectl logs -f <pod>
```

---

## 📦 Domain Mapping

If you have a domain (`e.g. piyush-web-app.co.in`), point it to the **LoadBalancer IP** and use an `A-record`.

---

## ✅ Final App Access

- **Frontend App**: via domain or LoadBalancer IP (`https://<ip>/`)
- **K8s Dashboard**: `https://<ip>:443` → login via kubeconfig

---

## 📝 Summary

- ✅ You deployed BidStream using raw Kubernetes YAMLs
- ✅ Used `kubectl apply` for backend, frontend, secrets, ingress
- ✅ Exposed the dashboard via LoadBalancer
- ❌ Skipped GitOps, Helm, ArgoCD, observability tools

---

## 📜 License

MIT – Free to use & modify.
