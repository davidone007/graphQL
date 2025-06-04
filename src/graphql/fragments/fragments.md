# GraphQL Fragments

## User Fragments

### Basic User Fragment

```graphql
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
```

### User with Projects Fragment

```graphql
fragment UserWithProjects on User {
  ...UserBasic
  projects {
    ...ProjectBasic
  }
}
```

## Project Fragments

### Basic Project Fragment

```graphql
fragment ProjectBasic on Project {
  id
  name
  description
  status
  ownerId
  createdAt
  updatedAt
}
```

### Project with Owner Fragment

```graphql
fragment ProjectWithOwner on Project {
  ...ProjectBasic
  owner {
    ...UserBasic
  }
}
```

## Auth Fragments

### Auth Payload Fragment

```graphql
fragment AuthPayloadBasic on AuthPayload {
  accessToken
  user {
    ...UserBasic
  }
}
```

## Usage Examples

### Query Users with Projects

```graphql
query GetUsers {
  users {
    ...UserWithProjects
  }
}
```

### Query Projects with Owner

```graphql
query GetProjects {
  projects {
    ...ProjectWithOwner
  }
}
```

### Login Mutation

```graphql
mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...AuthPayloadBasic
  }
}
```

### Register Mutation

```graphql
mutation Register($createUserInput: CreateUserInput!) {
  register(createUserInput: $createUserInput) {
    ...AuthPayloadBasic
  }
}
```
