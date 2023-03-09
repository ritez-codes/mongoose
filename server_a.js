const port = 5050;
const express = require("express");
const app = express();
const { mongoConnect, User, Blog } = require("./mongoose");

mongoConnect();

// body parser..
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("get /");
});

app.post("/user", async (req, res) => {
  try {
    //     const user = new User(req.body);
    //    await user.save(); //first method
    await User.create(req.body); //second method : better method
    res.status(201).send("user created successfully");
  } catch (error) {
    res.status(401);
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(404);
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("data updated successfully!");
  } catch (error) {
    res.status(404);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    await User.findOneAndRemove(req.params.id);
    res.status(200).send("data deleted successfully");
  } catch (error) {
    res.status(404);
  }
});

app.post("/blog", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).send("blog created");
  } catch (error) {
    res.status(404);
  }
});

const populateMethod = async () => {
  const article = await Blog.findOne({
    _id: "64095048c74a291ae3e807d6",
  }).populate("author_id");
  console.log(article);
};
populateMethod();

// other useful methods
// exists method
const existMethod = async () => {
  const user = await User.exists({ name: "Riteswar" });
  console.log(user); //returns either null or object id
};
// existMethod();

// where method
const whereMethod = async () => {
  // finding an item using where and projecting id and username with select.
  const userWhere = await User.where("name")
    .equals("Tandon")
    .select("_id username");
  console.log(userWhere);
};
// whereMethod();

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
