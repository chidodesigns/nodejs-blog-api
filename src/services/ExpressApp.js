const express = require("express");
const path = require("path");

//  Routes
const authRoute = require("../routes/auth");
const userRoute = require("../routes/users");
const postRoute = require("../routes/posts");
const categoryRoute = require("../routes/categories");

const ExpressApp = async (app) => {
  app.use(express.json());

  const imagePath = path.join(__dirname, "../images");

  app.use("/images", express.static(imagePath));

  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/categories", categoryRoute);

  return app
};

module.exports = ExpressApp