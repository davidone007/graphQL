# 🚀 Quick Test Queries - Apollo GraphQL Playground

## Queries Rápidas para Desarrollo y Testing

### 🔐 LOGIN RÁPIDO

```graphql
# Admin Login
mutation {
  login(loginInput: {
    email: "admin@example.com"
    password: "admin123"
  }) {
    accessToken
    user { id email firstName lastName role }
  }
}

# User Login  
mutation {
  login(loginInput: {
    email: "user@example.com"
    password: "user123"
  }) {
    accessToken
    user { id email firstName lastName role }
  }
}
```

### 👥 USUARIOS

```graphql
# Get All Users
query { users { id email firstName lastName role isActive createdAt } }

# Get Me
query { me { id email firstName lastName role projects { id name status } } }

# Create User
mutation {
  register(createUserInput: {
    email: "test@example.com"
    firstName: "Test"
    lastName: "User"
    password: "password123"
  }) {
    accessToken
    user { id email firstName lastName role }
  }
}
```

### 📁 PROYECTOS

```graphql
# Get All Projects
query { 
  projects { 
    id name description status createdAt 
    owner { firstName lastName email } 
  } 
}

# Create Project
mutation {
  createProject(createProjectInput: {
    name: "Test Project"
    description: "Quick test project"
    status: "active"
  }) {
    id name description status owner { firstName lastName }
  }
}

# Update Project
mutation {
  updateProject(
    id: "PROJECT_ID"
    updateProjectInput: {
      name: "Updated Project"
      status: "completed"
    }
  ) {
    id name description status updatedAt
  }
}
```

### 🧩 CON FRAGMENTS

```graphql
fragment UserBasic on User {
  id email firstName lastName fullName role isActive createdAt
}

fragment ProjectBasic on Project {
  id name description status ownerId createdAt
}

query {
  users {
    ...UserBasic
    projects { ...ProjectBasic }
  }
}
```

### ⚡ ONE-LINERS

```graphql
# Quick data check
query { users { id email role } projects { id name status } }

# User count
query { users { id } }

# My projects
query { me { projects { id name status } } }
```

---

## 🎯 Headers para Testing

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

## 📋 Variables Template

```json
{
  "id": "USER_OR_PROJECT_ID",
  "input": {
    "name": "Value",
    "description": "Value"
  }
}
```
