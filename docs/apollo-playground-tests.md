# Apollo GraphQL Playground Tests

## 🚀 Guía de Testing para Apollo GraphQL Playground

Este documento contiene ejemplos completos para probar todas las funcionalidades de la API GraphQL en Apollo Playground.

### 📋 Configuración Inicial

1. **Abrir Apollo Playground**: http://localhost:3001/graphql
2. **Headers de Autenticación**: Para queries que requieren autenticación, agregar en la pestaña "HTTP HEADERS":

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

---

## 🔐 1. AUTENTICACIÓN

### 1.1 Registro de Usuario Nuevo

```graphql
# Variables
{
  "input": {
    "email": "newuser@test.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "password123"
  }
}

# Query
mutation RegisterUser($input: CreateUserInput!) {
  register(createUserInput: $input) {
    accessToken
    user {
      id
      email
      firstName
      lastName
      fullName
      role
      isActive
      createdAt
    }
  }
}
```

**Resultado Esperado:**
- ✅ Token JWT válido
- ✅ Usuario con rol "USER"
- ✅ Email y nombres correctos

### 1.2 Login - Usuario Administrador

```graphql
# Variables
{
  "input": {
    "email": "admin@example.com",
    "password": "admin123"
  }
}

# Query
mutation LoginAdmin($input: LoginInput!) {
  login(loginInput: $input) {
    accessToken
    user {
      id
      email
      firstName
      lastName
      fullName
      role
      isActive
      createdAt
    }
  }
}
```

**Resultado Esperado:**
- ✅ Token JWT válido
- ✅ Usuario con rol "SUPERADMIN"
- ✅ Datos del administrador

### 1.3 Login - Usuario Regular

```graphql
# Variables
{
  "input": {
    "email": "user@example.com",
    "password": "user123"
  }
}

# Query
mutation LoginUser($input: LoginInput!) {
  login(loginInput: $input) {
    accessToken
    user {
      id
      email
      firstName
      lastName
      fullName
      role
      isActive
      createdAt
    }
  }
}
```

---

## 👥 2. GESTIÓN DE USUARIOS

### 2.1 Obtener Todos los Usuarios
> **Requiere:** Token JWT válido

```graphql
# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
query GetAllUsers {
  users {
    id
    email
    firstName
    lastName
    fullName
    role
    isActive
    createdAt
    updatedAt
    projects {
      id
      name
      status
      createdAt
    }
  }
}
```

**Resultado Esperado:**
- ✅ Array de usuarios con sus proyectos
- ✅ Información completa de cada usuario

### 2.2 Obtener Usuario Actual (Me)
> **Requiere:** Token JWT válido

```graphql
# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
query GetCurrentUser {
  me {
    id
    email
    firstName
    lastName
    fullName
    role
    isActive
    createdAt
    projects {
      id
      name
      description
      status
      createdAt
    }
  }
}
```

### 2.3 Obtener Usuario por ID
> **Requiere:** Token JWT válido

```graphql
# Variables
{
  "id": "USER_ID_HERE"
}

# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
query GetUserById($id: String!) {
  user(id: $id) {
    id
    email
    firstName
    lastName
    fullName
    role
    isActive
    createdAt
    projects {
      id
      name
      status
    }
  }
}
```

### 2.4 Actualizar Usuario
> **Requiere:** Token JWT válido + ser el propietario o superadmin

```graphql
# Variables
{
  "id": "USER_ID_HERE",
  "input": {
    "firstName": "Nombre Actualizado",
    "lastName": "Apellido Actualizado"
  }
}

# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
mutation UpdateUserProfile($id: String!, $input: UpdateUserInput!) {
  updateUser(id: $id, updateUserInput: $input) {
    id
    email
    firstName
    lastName
    fullName
    role
    isActive
    updatedAt
  }
}
```

### 2.5 Eliminar Usuario (Solo Superadmin)
> **Requiere:** Token JWT de superadmin

```graphql
# Variables
{
  "id": "USER_ID_HERE"
}

# HTTP Headers
{
  "Authorization": "Bearer SUPERADMIN_JWT_TOKEN"
}

# Query
mutation DeleteUser($id: String!) {
  removeUser(id: $id)
}
```

---

## 📁 3. GESTIÓN DE PROYECTOS

### 3.1 Crear Proyecto
> **Requiere:** Token JWT válido

```graphql
# Variables
{
  "input": {
    "name": "Mi Proyecto Apollo",
    "description": "Proyecto creado desde Apollo GraphQL Playground para testing",
    "status": "active"
  }
}

# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
mutation CreateNewProject($input: CreateProjectInput!) {
  createProject(createProjectInput: $input) {
    id
    name
    description
    status
    ownerId
    createdAt
    owner {
      id
      firstName
      lastName
      email
      role
    }
  }
}
```

**Resultado Esperado:**
- ✅ Proyecto creado con ID único
- ✅ Owner asignado al usuario autenticado
- ✅ Estado "active"

### 3.2 Obtener Todos los Proyectos
> **Requiere:** Token JWT válido

```graphql
# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
query GetAllProjects {
  projects {
    id
    name
    description
    status
    ownerId
    createdAt
    updatedAt
    owner {
      id
      firstName
      lastName
      email
      role
    }
  }
}
```

### 3.3 Obtener Proyecto por ID
> **Requiere:** Token JWT válido

```graphql
# Variables
{
  "id": "PROJECT_ID_HERE"
}

# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
query GetProjectById($id: String!) {
  project(id: $id) {
    id
    name
    description
    status
    ownerId
    createdAt
    updatedAt
    owner {
      id
      firstName
      lastName
      email
      role
    }
  }
}
```

### 3.4 Actualizar Proyecto
> **Requiere:** Token JWT válido + ser el propietario o superadmin

```graphql
# Variables
{
  "id": "PROJECT_ID_HERE",
  "input": {
    "name": "Proyecto Actualizado desde Apollo",
    "description": "Nueva descripción actualizada",
    "status": "completed"
  }
}

# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
mutation UpdateExistingProject($id: String!, $input: UpdateProjectInput!) {
  updateProject(id: $id, updateProjectInput: $input) {
    id
    name
    description
    status
    ownerId
    updatedAt
    owner {
      firstName
      lastName
    }
  }
}
```

### 3.5 Eliminar Proyecto
> **Requiere:** Token JWT válido + ser el propietario o superadmin

```graphql
# Variables
{
  "id": "PROJECT_ID_HERE"
}

# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
mutation DeleteProject($id: String!) {
  removeProject(id: $id)
}
```

**Resultado Esperado:**
- ✅ `true` si se eliminó correctamente
- ❌ Error si no tienes permisos

---

## 🔒 4. TESTS DE AUTORIZACIÓN

### 4.1 Acceso Sin Token (Should Fail)

```graphql
# NO incluir headers de autorización

# Query
query UnauthorizedAccess {
  users {
    id
    email
  }
}
```

**Resultado Esperado:**
- ❌ Error: "Unauthorized" o "Access denied"

### 4.2 Token Inválido (Should Fail)

```graphql
# HTTP Headers
{
  "Authorization": "Bearer invalid.jwt.token.here"
}

# Query
query InvalidTokenAccess {
  users {
    id
    email
  }
}
```

**Resultado Esperado:**
- ❌ Error: "Unauthorized" o "Invalid token"

### 4.3 Usuario Regular Intentando Eliminar Otro Usuario (Should Fail)

```graphql
# Variables (con ID de otro usuario)
{
  "id": "OTHER_USER_ID"
}

# HTTP Headers (token de usuario regular)
{
  "Authorization": "Bearer REGULAR_USER_JWT_TOKEN"
}

# Query
mutation UnauthorizedUserDeletion($id: String!) {
  removeUser(id: $id)
}
```

**Resultado Esperado:**
- ❌ Error: "Forbidden" o "Insufficient permissions"

---

## 🧩 5. QUERIES CON FRAGMENTS

### 5.1 Usar Fragment de Usuario

```graphql
# Fragment
fragment UserBasic on User {
  id
  email
  firstName
  lastName
  fullName
  role
  isActive
  createdAt
  updatedAt
}

# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query usando fragment
query GetUsersWithFragment {
  users {
    ...UserBasic
    projects {
      id
      name
      status
    }
  }
}
```

### 5.2 Fragment Combinado Usuario + Proyectos

```graphql
# Fragments
fragment UserBasic on User {
  id
  email
  firstName
  lastName
  fullName
  role
  isActive
  createdAt
  updatedAt
}

fragment ProjectBasic on Project {
  id
  name
  description
  status
  ownerId
  createdAt
  updatedAt
}

# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query usando múltiples fragments
query GetCompleteUserData {
  me {
    ...UserBasic
    projects {
      ...ProjectBasic
    }
  }
}
```

---

## ✅ 6. CHECKLIST DE TESTING

### Flujo Completo de Testing:

1. **Autenticación:**
   - [ ] Registro de usuario nuevo
   - [ ] Login con admin
   - [ ] Login con usuario regular
   - [ ] Verificar tokens JWT válidos

2. **Usuarios:**
   - [ ] Obtener lista de usuarios
   - [ ] Obtener usuario actual (me)
   - [ ] Actualizar perfil propio
   - [ ] Admin: eliminar usuario

3. **Proyectos:**
   - [ ] Crear proyecto nuevo
   - [ ] Obtener lista de proyectos
   - [ ] Obtener proyecto por ID
   - [ ] Actualizar proyecto propio
   - [ ] Eliminar proyecto propio

4. **Autorización:**
   - [ ] Fallar sin token
   - [ ] Fallar con token inválido
   - [ ] Fallar usuario regular eliminando otro usuario
   - [ ] Fallar usuario regular accediendo proyecto ajeno

5. **Fragments:**
   - [ ] Usar fragment UserBasic
   - [ ] Usar fragment ProjectBasic
   - [ ] Combinar múltiples fragments

### Códigos de Estado Esperados:
- ✅ **200**: Operación exitosa
- ❌ **400**: Bad Request (datos inválidos)
- ❌ **401**: Unauthorized (sin token o token inválido)
- ❌ **403**: Forbidden (sin permisos)
- ❌ **404**: Not Found (recurso no existe)

---

## 🎯 7. ESCENARIOS AVANZADOS

### 7.1 Test de Performance - Múltiples Queries

```graphql
# HTTP Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query compleja
query CompleteApplicationData {
  me {
    id
    email
    firstName
    lastName
    fullName
    role
    isActive
    projects {
      id
      name
      description
      status
      createdAt
    }
  }
  users {
    id
    email
    firstName
    lastName
    role
    projects {
      id
      name
      status
    }
  }
  projects {
    id
    name
    description
    status
    owner {
      firstName
      lastName
      email
    }
  }
}
```

### 7.2 Test de Validaciones

```graphql
# Variables con datos inválidos
{
  "input": {
    "email": "invalid-email",
    "firstName": "",
    "lastName": "",
    "password": "123"
  }
}

# Query
mutation TestValidations($input: CreateUserInput!) {
  register(createUserInput: $input) {
    accessToken
    user {
      id
      email
    }
  }
}
```

**Resultado Esperado:**
- ❌ Errores de validación específicos

---


