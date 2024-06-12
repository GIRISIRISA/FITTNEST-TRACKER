import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "Authorization header is missing!"));
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(createError(401, "Token is missing!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          // Invalid token
          return next(createError(401, "Invalid token!"));
        }
        if (err.name === "TokenExpiredError") {
          // Expired token
          return next(createError(401, "Token has expired!"));
        }
        // Other errors
        return next(createError(500, "Internal server error!"));
      }

      req.user = decoded;
      return next();
    });
  } catch (err) {
    next(err);
  }
};
