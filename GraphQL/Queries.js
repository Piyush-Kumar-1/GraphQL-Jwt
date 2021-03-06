import { GraphQLList, GraphQLID } from "graphql";
import { UserType, PostType } from "./Types.js";
import User from "../Model/User.js";
import Post from "../Model/Post.js";

const users = {
  type: new GraphQLList(UserType),
  description: "Retrieves list of users",
  resolve(parent, args) {
    return User.find();
  },
};

const user = {
  type: UserType,
  description: "Retrieves one user",
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    return User.findById(args.id);
  },
};

const posts = {
  type: new GraphQLList(PostType),
  description: "Retrieves list of posts(Editor)",
  resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error("Unauthorized");
    }
    console.log(verifiedUser);
    if (verifiedUser.role === "Admin") return Post.find();
    if (verifiedUser.role === "Author") {
      return Post.find({ id: verifiedUser._id });
    }
    if (verifiedUser.role === "Editor") return Post.find({ publish: "no" });
  },
};

export { users, user, posts };
