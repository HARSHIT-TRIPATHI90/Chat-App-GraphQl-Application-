# 🚀 Vulnerable GraphQL Chat Application Lab (CTF)

An intentionally vulnerable GraphQL application built for CTFs, API security practice, and GraphQL security research.

<p align="center">
  <!-- Add your project banner here if needed -->
</p>

⚠️ **WARNING:** This application is intentionally vulnerable. It is designed for educational and authorized security testing only. Do not deploy this application to production or expose the vulnerable server to the public internet.

---

## 📖 About

The **Vulnerable GraphQL Chat Application Lab** is a deliberately insecure chat application designed to demonstrate common vulnerabilities found in GraphQL and API-based applications.

The lab is divided into multiple progressive levels. Each level focuses on a different security weakness and provides a practical environment for learning how to discover, exploit, and fix critical GraphQL flaws.

---

## 🧩 Challenge Levels

| Level | Challenge | Vulnerability Category | Status |
| :--- | :--- | :--- | :--- |
| 🔍 **01** | Schema Recon | GraphQL Introspection / Information Disclosure | ✅ Active |
| 🕵️ **02** | Hidden Data | Excessive Data Exposure | ✅ Active |
| 🎯 **03** | User Access | IDOR (Insecure Direct Object Reference) | ✅ Active |
| 🔓 **04** | Admin Context | BOLA (Broken Object Level Authorization) | ✅ Active |
| 👑 **05** | Privilege Escalation | Mass Assignment | ✅ Active |

---

## 🏗️ Architecture

The application is built around a simple GraphQL chat backend where queries flow dynamically down through exposed, unvalidated pathways:

```text
                    ┌───────────────────┐
                    │      Client       │
                    │  Browser / CTF    │
                    └─────────┬─────────┘
                              │
                              │ GraphQL
                              ▼
                    ┌───────────────────┐
                    │   Apollo Server   │
                    │                   │
                    │ Queries / Mutations│
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │     Resolvers     │
                    │                   │
                    │ Auth / Data / API │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │   Application     │
                    │    Mock Data      │
                    └───────────────────┘
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Runtime Environment |
| **Apollo Server v3** | GraphQL Server Engine |
| **Docker** | Isolated Container Environment |
| **JavaScript** | Application Logic & Resolvers |

---

## ⚡ Quick Start

### 🐳 Option A: Run via Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone git@github.com:HARSHIT-TRIPATHI90/Chat-App-GraphQl-Application-.git
   cd Chat-App-GraphQl-Application-
   ```

2. **Build the image**
   ```bash
   docker build -t graphql-vulnerable-lab .
   ```

3. **Start the lab**
   ```bash
   docker run --rm -p 4000:4000 graphql-vulnerable-lab
   ```

4. **Open the GraphQL Playground**
   Navigate to [http://localhost:4000](http://localhost:4000) in your browser.

---

### 💻 Option B: Local Installation

If you don't want to use Docker, you can run the application directly with Node.js.

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   node app.js
   ```
   The application will be available at: [http://localhost:4000](http://localhost:4000)

---

## 🔬 Level breakdown & Objectives

### 🚩 Level 01 — Schema Recon
* **Vulnerability:** GraphQL Introspection Enabled
* **Objective:** Discover the application's underlying schema architecture. Look for Queries, Mutations, Hidden Types, and Arguments to understand how the API is structured.

### 🚩 Level 02 — Hidden Data
* **Vulnerability:** Excessive Data Exposure
* **Objective:** Find the flag hidden within system records. Look closely at the object models returned by `allMessages` to extract sensitive, unadvertised operational parameters (e.g., `isAdminOnly`).

### 🚩 Level 03 — IDOR
* **Vulnerability:** Insecure Direct Object Reference
* **Objective:** Access administrative profile secrets. The query `fetchUser(id: ID!)` trusts user parameters blindly. Fuzz the identifier properties (e.g., `999`) to bypass default system boundaries.

### 🚩 Level 04 — BOLA
* **Vulnerability:** Broken Object Level Authorization
* **Objective:** Hijack administrative identities in mutations. Investigate how `sendMessage` registers data logs without verifying session token details, allowing identity spoofing.

### 🚩 Level 05 — Mass Assignment
* **Vulnerability:** Insecure Mutation Inputs via Blind Spreads
* **Objective:** Escalate your privileges from `user` to `admin`. Exploit the vulnerable `updateProfile(input: ...)` parameter layout to modify administrative data parameters restricted from consumer interactions.

---

## 🛡️ Defensive Learning Matrix

After exploiting each level, try refactoring the codebase to implement industry-standard secure defaults:

| Vulnerability | Example Defense Strategy |
| :--- | :--- |
| **Introspection** | Disable introspection (`introspection: false`) in staging and production builds. |
| **Data Exposure** | Build dedicated UI data-transfer models; avoid exposing strict internal object keys. |
| **IDOR** | Never rely on user-supplied IDs; pull user properties straight out of authenticated session contexts. |
| **BOLA** | Implement role-based access checks inside specific object resolvers before yielding execution. |
| **Mass Assignment** | Strict field allow-listing. Avoid raw object mappings (`...input`) onto critical objects. |

---

## 📁 Project Structure

```text
graphql-vulnerable-lab/
│
├── app.js               # Entry point for the Apollo Server configuration
├── package.json         # Node.js configuration & dependencies
├── package-lock.json    # Locked dependency tree
├── Dockerfile           # Docker container deployment setup
├── README.md            # Lab documentation
│
└── graphql/
    ├── schema.js        # Vulnerable Type Definitions (Levels 1-5)
    └── resolver.js      # Vulnerable Resolvers & Data Mocks
```

---

## ⭐ Philosophy

**Break it. Understand it. Fix it.**  
This project is not just about finding flags. The real objective is to understand the underlying security failures and learn how the same vulnerabilities can be systematically prevented in real-world GraphQL microservices.

---

## 📜 License

This project is intended exclusively for educational, CTF practice, and security training purposes.
