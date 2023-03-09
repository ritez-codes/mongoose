//! Mongoose is described as “elegant MongoDB object modeling for Node.js.”
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// creating a schema for user
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: 7,
  },
  username: {
    type: String,
    required: true,
    maxLength: 8,
    lowercase: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

// importing SchemaTypes from mongoose
const { SchemaTypes } = require("mongoose");
// creating a schema for blog
const blogSchema = new Schema({
  author_id: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  content: String,
});

// creating a model
const User = new model("user", userSchema);
const Blog = new model("blog", blogSchema);

// connection string
const string = "mongodb://localhost:27017/restDB";

// mongodb connection establishing
const mongoConnect = () => {
  mongoose
    .connect(string)
    .then(() => {
      console.log("mongodb connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exporting
module.exports = {
  User,
  mongoConnect,
  Blog,
};
