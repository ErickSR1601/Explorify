import jwt from "jsonwebtoken";

/**
 * Generate a JWT token with a custom payload
 * @param {object} payload - object with user data (id, role, etc.)
 * @returns {string} signed token
 */
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Falta definir JWT_SECRET en las variables de entorno");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
