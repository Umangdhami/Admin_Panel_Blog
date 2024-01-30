const adminModel = require("../model/adminModel");
const blogModel = require("../model/blogModel");
const profileModel = require("../model/profileModel");
const fs = require("fs");
var us_id;

const defaultRoute = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.render("index", { blogs, us_id });
  } catch (err) {
    console.log(err);
  }
};

const login = (req, res) => {
  res.render("page-login");
};

const register = (req, res) => {
  res.render("page-register");
};

const creatUser = (req, res) => {
  const { name, email, password, conf_password } = req.body;

  if (password == conf_password) {
    try {
      const user = new adminModel({
        name,
        email,
        password,
      });
      user.save();
      res.redirect("/login");
    } catch (err) {
      console.log("er", err);
    }
  }
};

const userLogin = async (req, res) => {
  try {
    var users = await adminModel.find();

    const user = users.filter((user) => {
      return user.email == req.body.userEmail;
    });

    console.log("us", user);

    if (user.length == 0) {
      console.log("create account...");
      res.redirect("/register");
    } else {
      console.log("ok", user);
      if (user[0].password == req.body.userPassword) {
        console.log("login success fully....");
        us_id = user[0].id;
        res.redirect("/");
      } else {
        console.log("wrong password...");
      }
    }
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

const blog = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.render("blog", { blogs, us_id });
  } catch (err) {
    console.log(err);
  }
};

const addBlogPage = (req, res) => {
  res.render("add-blog");
};

const addBlog = (req, res) => {
  try {
    let addBlog = new blogModel({
      title: req.body.title,
      description: req.body.description,
      blogImg: req.file.path,
      userId: us_id,
    });

    addBlog.save();
    res.redirect("/showBlog");
  } catch (err) {
    console.log(err);
  }
};

const showBlog = async (req, res) => {
  res.redirect("/");
};

const editBlog = async (req, res) => {
  let blog = await blogModel.findById(req.params.id);
  res.render("edit", { blog });
};

const updateBlog = async (req, res) => {
  const { id, title, description } = req.body;
  const { path } = req.file;

  try {
    let oldBlog = await blogModel.findById(id);
    fs.unlink(oldBlog.blogImg, () => {});

    let updateBlog = await blogModel.findByIdAndUpdate(id, {
      title,
      description,
      blogImg: path,
    });
    res.redirect("/blog");
  } catch (err) {
    console.log(err);
  }
};

const deleteBlog = async (req, res) => {
  try {
    let deleteBlog = await blogModel.findByIdAndDelete(req.params.id);

    fs.unlink(deleteBlog.blogImg, () => {});

    res.redirect("/blog");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  defaultRoute,
  register,
  creatUser,
  login,
  userLogin,
  blog,
  addBlogPage,
  addBlog,
  showBlog,
  editBlog,
  updateBlog,
  deleteBlog,
};
