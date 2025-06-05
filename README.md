# 🚀 NestJS GraphQL API - Sistema de Gestión de Usuarios y Proyectos

![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![SQLite](https://img.shields.io/badge/sqlite-07405e?style=for-the-badge&logo=sqlite&logoColor=white)

## 📋 Descripción

API GraphQL desarrollada con NestJS que proporciona un sistema completo de gestión de usuarios y proyectos con autenticación JWT y autorización basada en roles. Este proyecto implementa las mejores prácticas de desarrollo con TypeScript, validaciones robustas y una arquitectura modular escalable.

### ✨ Características Principales

- 🔐 **Autenticación JWT** con roles (SUPERADMIN, USER)
- 👥 **Gestión completa de usuarios** (CRUD con validaciones)
- 📁 **Gestión de proyectos** con ownership y control de acceso
- 🛡️ **Autorización basada en roles** con guards personalizados
- 🧩 **GraphQL Fragments** para reutilización de queries
- ✅ **Validaciones robustas** con class-validator y class-transformer
- 🗄️ **Base de datos SQLite** con TypeORM y migraciones automáticas
- 📊 **Apollo Playground** integrado para testing
- 🔒 **Seguridad avanzada** con hash de contraseñas y tokens JWT
- 📚 **Documentación completa** con ejemplos y casos de uso


---

## 🚀 Guía de Ejecución Completa

### 📋 Prerrequisitos del Sistema

- **Node.js** v16.0.0 o superior ([Descargar](https://nodejs.org/))
- **npm** v7.0.0 o superior (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- **VS Code** (recomendado) con extensiones:
  - GraphQL
  - TypeScript and JavaScript Language Features
  - REST Client (para testing)

### 📦 Instalación Paso a Paso

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd GraphQl

# 2. Verificar versión de Node.js
node --version  # Debe ser v16+ 
npm --version   # Debe ser v7+

# 3. Instalar dependencias
npm install

# 4. Verificar instalación
npm list --depth=0

# 5. Crear archivo de configuración (opcional)
cp .env.example .env
# Editar .env con tus configuraciones personalizadas

# 6. Inicializar base de datos (automático al iniciar)
# La base de datos SQLite se crea automáticamente en ./database.sqlite
```

### 🔧 Comandos de Ejecución

```bash
# ===== DESARROLLO =====
# Iniciar servidor de desarrollo (con hot-reload)
npm run start:dev

# Iniciar servidor de desarrollo en modo watch
npm run start:dev --watch

# ===== PRODUCCIÓN =====
# Construir la aplicación para producción
npm run build

# Iniciar servidor en modo producción
npm run start:prod

# ===== TESTING =====
# Ejecutar todos los tests unitarios
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests end-to-end
npm run test:e2e

# Generar reporte de cobertura
npm run test:cov

# ===== CALIDAD DE CÓDIGO =====
# Verificar sintaxis y estilo de código
npm run lint

# Corregir errores de ESLint automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format

# ===== UTILIDADES =====
# Generar schema GraphQL actualizado
npm run build  # El schema se regenera automáticamente
```

### 🌐 URLs de Acceso

Una vez iniciado el servidor, tendrás acceso a:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **GraphQL Playground** | <http://localhost:3001/graphql> | Interfaz interactiva para testing |
| **API Endpoint** | <http://localhost:3001/graphql> | Endpoint principal de la API |
| **Documentación Schema** | <http://localhost:3001/graphql> | Schema autogenerado visible en Playground |

### 🔍 Verificación de Instalación

```bash
# 1. Verificar que el servidor inicia correctamente
npm run start:dev

# 2. En otra terminal, verificar conectividad
curl -X POST \
  http://localhost:3001/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"query { __schema { types { name } } }"}'

# 3. Abrir GraphQL Playground en navegador
# Visitar: http://localhost:3001/graphql
```

---

## 📡 Documentación Completa de Endpoints

### 🔐 Módulo de Autenticación

#### 📝 Registro de Usuario Nuevo

**Endpoint:** `mutation register`

```graphql
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

**Estructura del Input:**

```typescript
interface CreateUserInput {
  email: string;        // ✅ Requerido: Email válido y único
  firstName: string;    // ✅ Requerido: Mínimo 2 caracteres
  lastName: string;     // ✅ Requerido: Mínimo 2 caracteres  
  password: string;     // ✅ Requerido: Mínimo 6 caracteres
  role?: UserRole;      // 🔹 Opcional: Por defecto USER
}
```

**Ejemplo de Variables:**

```json
{
  "input": {
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "password": "password123"
  }
}
```

**Respuesta Exitosa:**
```json
{
  "data": {
    "register": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "uuid-generated-id",
        "email": "usuario@ejemplo.com",
        "firstName": "Juan",
        "lastName": "Pérez",
        "fullName": "Juan Pérez",
        "role": "USER",
        "isActive": true,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    }
  }
}
```

#### 🔑 Login de Usuario

**Endpoint:** `mutation login`

```graphql
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

**Estructura del Input:**
```typescript
interface LoginInput {
  email: string;        // ✅ Requerido: Email registrado
  password: string;     // ✅ Requerido: Contraseña del usuario
}
```

**Ejemplo de Variables:**
```json
{
  "input": {
    "email": "admin@ejemplo.com",
    "password": "admin123"
  }
}
```

---

### 👥 Módulo de Gestión de Usuarios

#### 📋 Obtener Todos los Usuarios
> **🔒 Requiere:** Token JWT válido

```graphql
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

**Headers Requeridos:**
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

**Respuesta Ejemplo:**
```json
{
  "data": {
    "users": [
      {
        "id": "user-id-1",
        "email": "admin@ejemplo.com",
        "firstName": "Admin",
        "lastName": "Sistema",
        "fullName": "Admin Sistema",
        "role": "SUPERADMIN",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "projects": [...]
      }
    ]
  }
}
```

#### 👤 Obtener Usuario Actual
> **🔒 Requiere:** Token JWT válido

```graphql
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

#### 🔍 Obtener Usuario por ID
> **🔒 Requiere:** Token JWT válido

```graphql
query GetUserById($id: ID!) {
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

**Variables:**
```json
{
  "id": "user-uuid-here"
}
```

#### ✏️ Actualizar Usuario
> **🔒 Requiere:** Token JWT + ser propietario o SUPERADMIN

```graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
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

**Estructura del Input:**
```typescript
interface UpdateUserInput {
  firstName?: string;   // 🔹 Opcional: Nuevo nombre
  lastName?: string;    // 🔹 Opcional: Nuevo apellido  
  email?: string;       // 🔹 Opcional: Nuevo email (debe ser único)
  isActive?: boolean;   // 🔹 Opcional: Estado del usuario (solo SUPERADMIN)
  role?: UserRole;      // 🔹 Opcional: Nuevo rol (solo SUPERADMIN)
  password?: string;    // 🔹 Opcional: Nueva contraseña
}
```

#### 🗑️ Eliminar Usuario
> **🔒 Requiere:** Token JWT + rol SUPERADMIN

```graphql
mutation DeleteUser($id: ID!) {
  removeUser(id: $id)
}
```

**Variables:**
```json
{
  "id": "user-uuid-to-delete"
}
```

**Respuesta:**
```json
{
  "data": {
    "removeUser": true
  }
}
```

---

### 📁 Módulo de Gestión de Proyectos

#### ➕ Crear Proyecto Nuevo
> **🔒 Requiere:** Token JWT válido

```graphql
mutation CreateProject($input: CreateProjectInput!) {
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

**Estructura del Input:**
```typescript
interface CreateProjectInput {
  name: string;         // ✅ Requerido: Nombre del proyecto
  description?: string; // 🔹 Opcional: Descripción del proyecto
  status?: string;      // 🔹 Opcional: Por defecto "active"
}
```

**Valores Válidos para Status:**
- `"active"` (por defecto)
- `"inactive"`
- `"completed"`

**Ejemplo de Variables:**
```json
{
  "input": {
    "name": "Proyecto E-commerce",
    "description": "Desarrollo de tienda online con React y Node.js",
    "status": "active"
  }
}
```

#### 📋 Obtener Todos los Proyectos
> **🔒 Requiere:** Token JWT válido

```graphql
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

#### 🔍 Obtener Proyecto por ID
> **🔒 Requiere:** Token JWT válido

```graphql
query GetProjectById($id: ID!) {
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

#### 📊 Obtener Proyectos por Propietario
> **🔒 Requiere:** Token JWT válido

```graphql
query GetProjectsByOwner($ownerId: ID!) {
  projectsByOwner(ownerId: $ownerId) {
    id
    name
    description
    status
    createdAt
    updatedAt
  }
}
```

#### ✏️ Actualizar Proyecto
> **🔒 Requiere:** Token JWT + ser propietario o SUPERADMIN

```graphql
mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
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

**Estructura del Input:**
```typescript
interface UpdateProjectInput {
  name?: string;        // 🔹 Opcional: Nuevo nombre
  description?: string; // 🔹 Opcional: Nueva descripción
  status?: string;      // 🔹 Opcional: Nuevo estado
}
```

#### 🗑️ Eliminar Proyecto
> **🔒 Requiere:** Token JWT + ser propietario o SUPERADMIN

```graphql
mutation DeleteProject($id: ID!) {
  removeProject(id: $id)
}
```

---

## 📋 Tipos de Documentos y Estructuras de Datos

### 🏗️ Entidades Principales

#### 👤 Usuario (User Entity)

```typescript
interface User {
  // === IDENTIFICACIÓN ===
  id: string;           // UUID único generado automáticamente
  email: string;        // Email único, usado para login
  
  // === INFORMACIÓN PERSONAL ===
  firstName: string;    // Nombre del usuario
  lastName: string;     // Apellido del usuario
  fullName: string;     // Nombre completo (campo calculado)
  
  // === SEGURIDAD ===
  password: string;     // Hash bcrypt de la contraseña
  role: UserRole;       // Rol del usuario (SUPERADMIN | USER)
  isActive: boolean;    // Estado activo/inactivo del usuario
  
  // === TIMESTAMPS ===
  createdAt: Date;      // Fecha y hora de creación
  updatedAt: Date;      // Fecha y hora de última actualización
  
  // === RELACIONES ===
  projects: Project[];  // Array de proyectos del usuario
}
```

**Validaciones del Usuario:**
- `email`: Formato de email válido, único en el sistema
- `firstName`: Mínimo 2 caracteres, solo letras y espacios
- `lastName`: Mínimo 2 caracteres, solo letras y espacios
- `password`: Mínimo 6 caracteres, hash automático con bcrypt
- `role`: Debe ser uno de los valores del enum UserRole

#### 📁 Proyecto (Project Entity)

```typescript
interface Project {
  // === IDENTIFICACIÓN ===
  id: string;           // UUID único generado automáticamente
  name: string;         // Nombre del proyecto
  
  // === INFORMACIÓN ===
  description?: string; // Descripción opcional del proyecto
  status: ProjectStatus; // Estado del proyecto
  
  // === OWNERSHIP ===
  ownerId: string;      // ID del usuario propietario
  owner: User;          // Relación con el usuario propietario
  
  // === TIMESTAMPS ===
  createdAt: Date;      // Fecha y hora de creación
  updatedAt: Date;      // Fecha y hora de última actualización
}
```

**Validaciones del Proyecto:**
- `name`: Mínimo 3 caracteres, máximo 100 caracteres
- `description`: Máximo 500 caracteres
- `status`: Debe ser uno de los valores del enum ProjectStatus
- `ownerId`: Debe corresponder a un usuario existente

### 🔢 Enumeraciones (Enums)

#### 👥 Roles de Usuario

```typescript
enum UserRole {
  SUPERADMIN = 'SUPERADMIN',  // Administrador con todos los permisos
  USER = 'USER'               // Usuario regular con permisos limitados
}
```

**Permisos por Rol:**

| Acción | USER | SUPERADMIN |
|--------|------|------------|
| 👀 Ver usuarios | ✅ | ✅ |
| 👀 Ver proyectos | ✅ | ✅ |
| ✏️ Editar perfil propio | ✅ | ✅ |
| ✏️ Editar otros perfiles | ❌ | ✅ |
| 🗑️ Eliminar usuarios | ❌ | ✅ |
| ➕ Crear proyectos | ✅ | ✅ |
| ✏️ Editar proyectos propios | ✅ | ✅ |
| ✏️ Editar proyectos ajenos | ❌ | ✅ |
| 🗑️ Eliminar proyectos propios | ✅ | ✅ |
| 🗑️ Eliminar proyectos ajenos | ❌ | ✅ |

#### 📊 Estados de Proyecto

```typescript
enum ProjectStatus {
  ACTIVE = 'active',         // Proyecto activo en desarrollo
  INACTIVE = 'inactive',     // Proyecto pausado temporalmente
  COMPLETED = 'completed'    // Proyecto completado
}
```

### 📨 DTOs (Data Transfer Objects)

#### 🔐 Autenticación

```typescript
// Registro de usuario
interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
}

// Login de usuario
interface LoginInput {
  email: string;
  password: string;
}

// Respuesta de autenticación
interface AuthPayload {
  accessToken: string;
  user: User;
}
```

#### 👤 Usuario

```typescript
// Actualización de usuario
interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  role?: UserRole;
}
```

#### 📁 Proyecto

```typescript
// Creación de proyecto
interface CreateProjectInput {
  name: string;
  description?: string;
  status?: ProjectStatus;
}

// Actualización de proyecto
interface UpdateProjectInput {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}
```

### 🔄 Tipos de Respuesta GraphQL

#### ✅ Respuestas Exitosas

```typescript
// Respuesta de mutación de usuario
interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Respuesta de mutación de proyecto
interface ProjectResponse {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  ownerId: string;
  owner: UserResponse;
  createdAt: string;
  updatedAt: string;
}

// Respuesta de eliminación
type DeleteResponse = boolean;
```

#### ❌ Tipos de Error

```typescript
// Error de GraphQL estándar
interface GraphQLError {
  message: string;
  extensions: {
    code: string;
    statusCode: number;
    timestamp: string;
    path: string;
  };
}

// Códigos de error comunes
enum ErrorCodes {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED', 
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}
```

### 🧩 GraphQL Fragments Avanzados

### 🔧 Fragments de Usuario

```graphql
# Fragment básico de usuario
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

# Fragment de usuario con proyectos
fragment UserWithProjects on User {
  ...UserBasic
  projects {
    id
    name
    description
    status
    createdAt
  }
}

# Fragment completo de usuario (para admin)
fragment UserComplete on User {
  ...UserBasic
  projects {
    ...ProjectBasic
  }
}
```

### 📁 Fragments de Proyecto

```graphql
# Fragment básico de proyecto
fragment ProjectBasic on Project {
  id
  name
  description
  status
  ownerId
  createdAt
  updatedAt
}

# Fragment de proyecto con propietario
fragment ProjectWithOwner on Project {
  ...ProjectBasic
  owner {
    ...UserBasic
  }
}
```

### 🔄 Uso Combinado de Fragments

```graphql
# Query completa usando múltiples fragments
query GetCompleteApplicationData {
  me {
    ...UserWithProjects
  }
  
  users {
    ...UserBasic
    projects {
      ...ProjectBasic
    }
  }
  
  projects {
    ...ProjectWithOwner
  }
}
```

---

## 🛡️ Autenticación y Autorización Detallada

### 🔐 Sistema de Autenticación JWT

#### Configuración de Headers

Para todas las operaciones protegidas, incluir:

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

#### Estructura del Token JWT

```typescript
interface JWTPayload {
  sub: string;          // User ID
  email: string;        // User email
  role: UserRole;       // User role
  iat: number;          // Issued at
  exp: number;          // Expiration time
}
```

#### Flujo de Autenticación

1. **Registro/Login** → Recibir `accessToken`
2. **Almacenar Token** → En localStorage, cookies o memoria
3. **Incluir en Headers** → En cada request protegido
4. **Renovación** → Cuando el token expire (7 días por defecto)

### 🔒 Matriz de Permisos Completa

| Operación | USER | SUPERADMIN | Notas |
|-----------|------|------------|-------|
| **👥 USUARIOS** | | | |
| Ver lista de usuarios | ✅ | ✅ | Todos pueden ver usuarios |
| Ver perfil propio | ✅ | ✅ | Solo su propia información |
| Ver perfil de otros | ✅ | ✅ | Información básica |
| Actualizar perfil propio | ✅ | ✅ | Cambiar nombre, email, etc. |
| Actualizar perfil de otros | ❌ | ✅ | Solo superadmin |
| Cambiar rol de usuario | ❌ | ✅ | Solo superadmin |
| Activar/desactivar usuario | ❌ | ✅ | Solo superadmin |
| Eliminar usuario | ❌ | ✅ | Solo superadmin |
| **📁 PROYECTOS** | | | |
| Ver todos los proyectos | ✅ | ✅ | Todos pueden ver |
| Crear proyecto | ✅ | ✅ | Automáticamente es owner |
| Ver proyectos propios | ✅ | ✅ | Filtro por ownerId |
| Actualizar proyecto propio | ✅ | ✅ | Solo owner o superadmin |
| Actualizar proyecto ajeno | ❌ | ✅ | Solo superadmin |
| Eliminar proyecto propio | ✅ | ✅ | Solo owner o superadmin |
| Eliminar proyecto ajeno | ❌ | ✅ | Solo superadmin |

---

## ⚠️ Manejo Completo de Errores

### 📊 Códigos de Estado HTTP

| Código | Nombre | Descripción | Cuándo Ocurre |
|--------|--------|-------------|---------------|
| **200** | OK | Operación exitosa | Query/Mutation correcta |
| **400** | Bad Request | Datos inválidos | Validación fallida |
| **401** | Unauthorized | No autenticado | Token faltante/inválido |
| **403** | Forbidden | Sin permisos | Rol insuficiente |
| **404** | Not Found | Recurso no existe | Usuario/Proyecto no encontrado |
| **409** | Conflict | Conflicto de datos | Email duplicado |
| **500** | Internal Error | Error del servidor | Error inesperado |

### 🚨 Ejemplos de Errores GraphQL

#### Error de Validación (400)

```json
{
  "errors": [
    {
      "message": "Validation failed",
      "extensions": {
        "code": "BAD_REQUEST",
        "statusCode": 400,
        "fields": {
          "email": "Email must be a valid email address",
          "firstName": "First name must be at least 2 characters long"
        }
      }
    }
  ]
}
```

#### Error de Autenticación (401)

```json
{
  "errors": [
    {
      "message": "Unauthorized access - Invalid or missing token",
      "extensions": {
        "code": "UNAUTHORIZED",
        "statusCode": 401
      }
    }
  ]
}
```

#### Error de Autorización (403)

```json
{
  "errors": [
    {
      "message": "You can only update your own profile",
      "extensions": {
        "code": "FORBIDDEN",
        "statusCode": 403
      }
    }
  ]
}
```

#### Error de Conflicto (409)

```json
{
  "errors": [
    {
      "message": "User with email admin@example.com already exists",
      "extensions": {
        "code": "CONFLICT",
        "statusCode": 409
      }
    }
  ]
}
```

---

## 🧪 Guía Completa de Testing


### 🎮 Testing Manual con Apollo Playground

1. **Abrir Playground**: <http://localhost:3001/graphql>
2. **Documentación**: Click en "DOCS" para ver schema
3. **Testing de Queries**: Ver [apollo-playground-tests.md](docs/apollo-playground-tests.md)

### 📮 Testing con Postman

1. **Importar Collection**: [postman-collection.json](docs/postman-collection.json)
2. **Variables**: Configurar `base_url`, `jwt_token`
3. **Ejecutar Tests**: Orden recomendado:
   - Authentication Tests
   - Users Management Tests
   - Projects Management Tests
   - Authorization Tests



---

## 📁 Estructura Detallada del Proyecto

```bash
📦 GraphQl/
├── 📄 package.json              # Dependencias y scripts
├── 📄 tsconfig.json            # Configuración TypeScript
├── 📄 nest-cli.json            # Configuración NestJS CLI
├── 📄 eslint.config.mjs        # Configuración ESLint
├── 📄 database.sqlite          # Base de datos SQLite
├── 📄 README.md                # Documentación principal
│
├── 📁 src/                     # Código fuente principal
│   ├── 📄 main.ts              # Punto de entrada de la aplicación
│   ├── 📄 app.module.ts        # Módulo raíz de la aplicación
│   ├── 📄 schema.gql           # Schema GraphQL autogenerado
│   │
│   ├── 📁 auth/                # 🔐 Módulo de Autenticación
│   │   ├── 📄 auth.module.ts   # Configuración del módulo
│   │   ├── 📄 auth.service.ts  # Lógica de autenticación
│   │   ├── 📄 auth.resolver.ts # Resolvers GraphQL
│   │   └── 📄 jwt.strategy.ts  # Estrategia JWT Passport
│   │
│   ├── 📁 users/               # 👥 Módulo de Usuarios
│   │   ├── 📄 user.entity.ts   # Entidad TypeORM User
│   │   ├── 📄 users.module.ts  # Configuración del módulo
│   │   ├── 📄 users.service.ts # Lógica de negocio usuarios
│   │   ├── 📄 users.resolver.ts # Resolvers GraphQL usuarios
│   │   └── 📁 dto/             # Data Transfer Objects
│   │       ├── 📄 user.input.ts # DTOs de entrada
│   │       └── 📄 auth-payload.dto.ts # DTOs de respuesta
│   │
│   ├── 📁 projects/            # 📁 Módulo de Proyectos
│   │   ├── 📄 project.entity.ts # Entidad TypeORM Project
│   │   ├── 📄 projects.module.ts # Configuración del módulo
│   │   ├── 📄 projects.service.ts # Lógica de negocio proyectos
│   │   ├── 📄 projects.resolver.ts # Resolvers GraphQL proyectos
│   │   └── 📁 dto/             # Data Transfer Objects
│   │       └── 📄 project.input.ts # DTOs de proyectos
│   │
│   ├── 📁 common/              # 🔧 Utilidades Compartidas
│   │   ├── 📄 seed.service.ts  # Servicio de inicialización de datos
│   │   ├── 📁 decorators/      # Decoradores personalizados
│   │   │   ├── 📄 current-user.decorator.ts # Decorador usuario actual
│   │   │   └── 📄 roles.decorator.ts # Decorador de roles
│   │   ├── 📁 enums/           # Enumeraciones
│   │   │   └── 📄 user-role.enum.ts # Enum de roles
│   │   ├── 📁 exceptions/      # Excepciones personalizadas
│   │   │   └── 📄 custom.exceptions.ts # Excepciones del sistema
│   │   ├── 📁 guards/          # Guards de seguridad
│   │   │   ├── 📄 gql-auth.guard.ts # Guard autenticación GraphQL
│   │   │   └── 📄 roles.guard.ts # Guard autorización roles
│   │   └── 📁 interfaces/      # Interfaces compartidas
│   │       └── 📄 common.interface.ts # Interfaces comunes
│   │
│   └── 📁 graphql/             # 🧩 Recursos GraphQL
│       └── 📁 fragments/       # Fragments reutilizables
│           └── 📄 fragments.md # Documentación fragments
│
├── 📁 docs/                    # 📚 Documentación
│   ├── 📄 apollo-playground-tests.md # Guía testing Apollo
│   ├── 📄 postman-collection.json # Collection Postman
│   └── 📄 quick-queries.md    # Queries rápidas
│
└── 📁 test/                    # 🧪 Tests
    ├── 📄 app.e2e-spec.ts     # Tests end-to-end
    └── 📄 jest-e2e.json       # Configuración Jest E2E
```

---

## 🚀 Guía de Despliegue Completa

### 🌍 Variables de Entorno

```bash
# 📄 .env (Desarrollo)
# Environment Variables
# Copy this file to .env and update the values as needed

# Application
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRATION=24h

# Database Configuration (SQLite)
DB_PATH=database.sqlite

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=debug

NODE_ENV=development
```



### 🔧 Setup de Desarrollo

```bash
# 1. Clonar y configurar
git clone <repo-url>
cd GraphQl
npm install

# 2. Instalar herramientas de desarrollo
npm install -g @nestjs/cli

# 3. Configurar VS Code (recomendado)
# Extensiones: GraphQL, TypeScript, Prettier, ESLint

# 4. Ejecutar en modo desarrollo
npm run start:dev
```



---

- **📖 Documentación:** [`docs/`](docs/)
- **🧪 Guía de Testing:** [`docs/apollo-playground-tests.md`](docs/apollo-playground-tests.md)
- **📮 Postman Collection:** [`docs/postman-collection.json`](docs/postman-collection.json)

---


### 🌟 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **NestJS** | ^10.0.0 | Framework backend |
| **GraphQL** | ^16.6.0 | API Query Language |
| **TypeScript** | ^5.0.0 | Lenguaje de programación |
| **TypeORM** | ^0.3.0 | ORM para base de datos |
| **SQLite** | ^3.0.0 | Base de datos |
| **JWT** | ^10.0.0 | Autenticación |
| **Apollo Server** | ^4.0.0 | Servidor GraphQL |
| **Class Validator** | ^0.14.0 | Validaciones |


---

## Autores

- [Davide Flamini](https://github.com/davidone007)
- [Andrés Cabezas](https://github.com/andrescabezas26)
- [Nicolas Cuellar](https://github.com/Nicolas-CM)
