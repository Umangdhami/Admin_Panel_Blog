const express = require('express');
const route = express();
const controller = require('../controllers/userControll')
const ImgUpload = require('../middlewares/blogImgMiddleware')

route.get('/', controller.defaultRoute);
route.get('/login', controller.login)
route.get('/register', controller.register)
route.post('/creatUser', controller.creatUser)
route.post('/userLogin', controller.userLogin)
route.get('/blog', controller.blog);
route.get('/addBlogPage', controller.addBlogPage);
route.post('/addBlog', ImgUpload.single('blogImg'), controller.addBlog);
route.get('/showBlog', controller.showBlog)
route.get('/editBlog/:id', controller.editBlog)
route.post('/updateBlog', ImgUpload.single('blogImg'), controller.updateBlog)
route.get('/deleteBlog/:id', controller.deleteBlog)

module.exports = route