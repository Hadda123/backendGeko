const express = require("express");

const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, liketheBlog, disliketheBlog,  } = require("../controller/blogCtrl");

const router = express.Router();
router.post("/" ,  createBlog)
router.put("/:id" , updateBlog)
router.get("/likes" , liketheBlog)
router.get("/dislikes" , disliketheBlog)
router.get("/:id" , getBlog)
router.get("/", getAllBlogs)


  
router.delete("/:id" , deleteBlog)

 module.exports = router ;