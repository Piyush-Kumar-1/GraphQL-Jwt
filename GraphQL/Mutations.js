import { GraphQLString } from "graphql";
import { PostType } from "./Types.js";
import User from "../Model/User.js";
import Post from "../Model/Post.js";
import { createJwtToken } from "../util/auth.js";
import bcrypt from "bcryptjs";

const register = {
  type: GraphQLString,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { name, email, password, role } = args;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, hashedpassword, role });
    await user.save();
    const token = createJwtToken(user);
    return token;
  },
};

const login = {
  type: GraphQLString,
  description: "Login user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const user = await User.findOne({ email: args.email });
    // console.log(user);
    const valid = await bcrypt.compare(args.password, user.hashedpassword);
    if (!user || !valid) {
      throw new Error("Invalid credentials");
    }

    const token = createJwtToken(user);
    return token;
  },
};

const addPost = {
  type: PostType,
  description: "Post new post",
  args: {
    title: { type: GraphQLString },
    bannerImg: { type: GraphQLString },
    content: { type: GraphQLString },
    publish: { type: GraphQLString },
  },

  resolve(parent, args, { verifiedUser }) {
    // console.log("Verified User: ", verifiedUser);
    if ((!verifiedUser, verifiedUser.role != "Author")) {
      throw new Error("Unauthorized");
    }
    // console.log(verifiedUser);
    const post = new Post({
      id: verifiedUser._id,
      title: args.title,
      bannerImg: args.bannerImg,
      content: args.content,
      publish: args.publish,
    });

    return post.save();
  },
};

const updatePost = {
  type: PostType,
  description: "Update post",
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    bannerImg: { type: GraphQLString },
    content: { type: GraphQLString },
    publish: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error("Unauthenticated");
    }
    console.log(args);
    console.log(verifiedUser);
    let postUpdated;
    if (verifiedUser.role === "Admin") {
      postUpdated = await Post.findOneAndUpdate(
        {
          id: args.id,
        },
        {
          title: args.title,
          bannerImg: args.bannerImg,
          content: args.content,
          publish: args.publish,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    if (verifiedUser.role === "Author") {
      postUpdated = await Post.findOneAndUpdate(
        {
          // id: args.id,
          id: verifiedUser._id,
        },
        {
          title: args.title,
          bannerImg: args.bannerImg,
          content: args.content,
          publish: args.publish,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    if (!postUpdated) {
      throw new Error("No");
    }

    return postUpdated;
  },
};

export { register, login, addPost, updatePost };
