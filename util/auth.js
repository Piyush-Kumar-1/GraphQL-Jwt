import jwt from "jsonwebtoken";

const createJwtToken = (user) => {
  return jwt.sign({ user }, "1234", {
    expiresIn: "1h",
  });
};

export { createJwtToken };
