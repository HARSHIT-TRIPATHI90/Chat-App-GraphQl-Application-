# 💬 GraphQL Chat App

A minimal chat backend built with Apollo Server — made for practicing
how to write a GraphQL schema, and how to call it with queries and
mutations. No frontend, no database: just a schema, an in-memory message
list, and a GraphQL Playground to experiment in.

## Why this exists

This is a first-project-sized sandbox for learning GraphQL basics: how a
`type` is defined, how a `Query` and a `Mutation` are different, how
resolvers connect a schema to actual data, and how arguments flow into a
mutation. Good for getting comfortable with the fundamentals before
moving on to anything bigger.

## Run it

```bash
npm install
node app.js
```

The console will print the local URL (something like
`http://localhost:4000/`) — open that in your browser to get the
GraphQL Playground.

> Note: messages are stored in memory only (a plain JS array), so
> they're wiped every time the server restarts. That's intentional —
> this project is about practicing the GraphQL layer, not persistence.

## The schema

```graphql
type Message {
  id: ID!
  content: String!
  author: String!
}

type Query {
  messages: [Message!]!
}

type Mutation {
  sendMessage(content: String!, author: String!): Message!
}
```

## Try it in the Playground

**Send a message:**
```graphql
mutation {
  sendMessage(content: "Hello world!", author: "harshit") {
    id
    content
    author
  }
}
```

**Read all messages back:**
```graphql
query {
  messages {
    id
    content
    author
  }
}
```

**Only fetch the fields you need** — this is the part that makes GraphQL
different from a typical REST endpoint. Try asking for just one field:
```graphql
query {
  messages {
    content
  }
}
```

## Things to try extending

Once the basics feel comfortable, good next steps on this same codebase:

- Add a `deleteMessage(id: ID!)` mutation.
- Add a `timestamp` field to `Message`, set automatically in the
  resolver (not passed in by the client).
- Add a `user(author: String!)` query that filters `messages` down to
  one author.
- Swap the in-memory array for a real data source (SQLite, a JSON file,
  anything) without changing the schema at all — a good way to see how
  GraphQL decouples the API shape from where the data actually lives.

## Project structure

```
chat-app/
├── app.js                # Apollo Server entry point
├── package.json
├── package-lock.json
└── graphql/
    ├── schema.js          # Type definitions (Message, Query, Mutation)
    └── resolver.js         # Resolvers + the in-memory messages array
```

## License

ISC
