# 📝 Multi-Tenant SaaS Notes Application

- A full-stack multi-tenant SaaS notes application built with Node.js, Express, MongoDB Atlas, Next.js, and JWT authentication.
- Supports multiple tenants with strict data isolation, role-based access control, and subscription gating.
<br>

## 🚀 Project Objective

- Provide a secure SaaS Notes app where different companies (tenants) can manage their users and notes independently.

- Enforce role-based access:

  - Admin → manage users, upgrade subscription.

  - Member → create, view, edit, delete notes.

- Enforce subscription plans:

  - Free Plan → max 3 notes per tenant.

  - Pro Plan → unlimited notes after upgrade.
<br>

## 🛠️ Tech Stack

- Backend: Node.js, Express, MongoDB Atlas (Mongoose), JWT, CORS

- Frontend: Next.js (React), CSS

- Deployment: Vercel (frontend & backend)
<br>

## 🏢 Multi-Tenancy Approach

We used **shared schema with tenant ID column:**

- Each <code>User</code> and <code>Note</code> document references a <code>Tenant</code> by <code>_id</code>.

- Queries are always filtered by tenant, ensuring strict isolation.

- This approach is scalable and keeps the schema simple.
<br>

## 🔑 Test Accounts

All accounts use password: <code>password</code>

| Email  | Role | Tenant |
| -------------- | ------------- | ------------- |
| admin@acme.test  | Admin  | Acme |
| user@acme.test  | Member  | Acme |
| admin@globex.test | Admin | Globex |
| user@globex.test | Membar | Globex |
<br>

## 🌐 Deployment URLs

- Backend (Base URL): [https://multi-tenant-notes-saas.vercel.app](https://multi-tenant-notes-saas.vercel.app/)

  - Health Check: <code>/health</code> → <code>{ "status": "ok" }</code>

- Frontend: [https://multi-tenant-notes-saas-frontend.vercel.app](https://multi-tenant-notes-saas-frontend.vercel.app/)
<br>

## 📌 Features

- JWT-based login & auth middleware

- Role-based access (Admin vs Member)

- Tenant isolation → no cross-tenant access

- Subscription gating (3 notes max on Free plan)

- Upgrade endpoint: <code>POST /tenants/:slug/upgrade</code> (Admin only)

- Notes CRUD (Create, Read, Update, Delete)

- Minimal frontend with login, notes listing, creation, deletion, and upgrade flow
<br>

## 🖥️ Run Locally
1. Clone repo
```
git clone https://github.com/yourusername/Multi-Tenant-Notes-Saas.git
cd Multi-Tenant-Notes-Saas
```

2. Setup Backend
```
cd backend
npm install
cp .env.example .env   # add MongoDB URI & JWT secret
npm run dev
```

Backend runs at <code>http://localhost:5000</code>

3. Setup Frontend
```
cd frontend
npm install
cp .env.example .env   # set NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

Frontend runs at <code>http://localhost:3000</code>
<br>

## 📂 Folder Structure
```
Multi-Tenant-Notes-Saas/
│── backend/     # Express + MongoDB + JWT API
│── frontend/    # Next.js + CSS frontend
│── README.md
```
<br>

## ✅ Health Check

- GET <code>/health</code> → <code>{ "status": "ok" }</code>
<br>

## 📜 License

This project is for **Yardstick Internship Assignment** evaluation.
