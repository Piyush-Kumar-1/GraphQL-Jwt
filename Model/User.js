import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  hashedpassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
export default mongoose.model("User", userSchema);
