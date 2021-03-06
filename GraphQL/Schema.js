import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { users, user, posts } from "./Queries.js";

import { register, login, addPost, updatePost } from "./Mutations.js";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Query",
  fields: { users, user, posts },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: { register, login, addPost, updatePost },
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export default schema;
