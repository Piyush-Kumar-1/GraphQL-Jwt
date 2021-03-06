import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bannerImg: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publish: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Post", postSchema);
