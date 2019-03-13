const jwt = require("jsonwebtoken");
const config = require("../config");

const authRoute = require("./auth");
const review = require("./review");
const product = require("./products");

const adminRoutes = require("./admin");

const api = {};
const isAuth = (req, res, next) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      config.JWT.secret,
      (error, decoded) => {
        if (error) {
          return next({
            message: "Unauthenticated",
            status: 401
          });
        }
        req.user = {
          _id: decoded._id,
          email: decoded.email,
          username: decoded.username
        };
        next();
      }
    );
  } else {
    return next({
      message: "Unauthenticated",
      head: "Header is not present in the request.",
      status: 401
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      config.JWT.secret,
      (error, decoded) => {
        if (error) {
          return next({
            message: "Unauthenticated",
            status: 401
          });
        }
        if (!decoded.admin) {
          return next({
            message: "You are not allowed to access.",
            status: 403
          });
        }
        req.user = {
          _id: decoded._id,
          email: decoded.email,
          username: decoded.username
        };
        next();
      }
    );
  } else {
    return next({
      message: "Unauthenticated",
      head: "Header is not present in the request.",
      status: 401
    });
  }
};
api.includeRoutes = app => {
  app.use("/auth", authRoute);
  app.use("/api/v1/*", isAuth); //authenticated routes

  app.use("/api/v1/admin*", isAdmin); //authenticated admin routes
  app.use("/api/v1/admin", adminRoutes);

  app.use("/api/v1/review", review);
  app.use("/api/v1/product", product);
};

module.exports = api;
