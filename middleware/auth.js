import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || "";

  try {
    const verified = jwt.verify(token, "1234");
    // const decoded = jwt.decode(token, process.env.JWT_SECRET)
    req.verifiedUser = verified.user;
    // console.log("Verification success!", verified);
  } catch (err) {
    console.log("Verification failed!", err);
    
  }
  next();
};

export default authenticate;
