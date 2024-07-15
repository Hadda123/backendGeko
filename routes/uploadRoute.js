const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");

const { uploadPhoto, page1ImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
  "/",
  uploadPhoto.array("images", 10),
  page1ImgResize,
  uploadImages
);

router.delete("/delete-img/:id",   deleteImages);

module.exports = router;