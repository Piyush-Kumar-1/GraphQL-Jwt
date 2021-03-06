import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "user details",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    hashedpassword: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "post",
  description: "posts",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    bannerImg: { type: GraphQLString },
    content: { type: GraphQLString },
    publish: { type: GraphQLString },
  }),
});

export { UserType, PostType };
