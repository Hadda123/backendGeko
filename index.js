const express = require("express");
require('./models/pdfDetail');

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const blogcategoryRouter = require("./routes/blogCatRoute");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const dotenv =require("dotenv").config();
const categoryRouter = require("./routes/productCatRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const uploadRouter = require("./routes/uploadRoute");
const cors = require("cors");
const productModel = require("./models/productModel");
const blogRouter = require("./routes/blogRoute");
const PORT = process.env.PORT || 4000;

dbConnect();


app.use(morgan("dev"));
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/user", authRouter)
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/blog", blogRouter)
app.use("/api/upload", uploadRouter);
app.use("/public" , express.static(path.join(__dirname,"public")))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
    filename: function (req, file, cb) {
      
            cb(null, file.name + '-' + Date.now())
    
          }
      
    })


const upload = multer({ storage: storage });
const PdfSchema = mongoose.model("PdfDetails");

app.post("/upload-files", upload.single("file"), async (req, res) => {
  const title = req.body.title;
  const fileName = req.file.filename;
  const description = req.body.description;
  const descriptionCourte = req.body.descriptionCourte;
  const category = req.body.category;
  const images = req.body.images;

  try {
    await productModel.create({ titre: title, fichTechnique: fileName 
      ,description:description , descriptionCourte:descriptionCourte ,category:category, images:images });
    res.send({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while saving the document." });
  }
});





app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});
app.use(notFound);
app.use(errorHandler);
app.use("/",(req, res)=> {
  res.send("hello from server side")
})
app.listen(PORT ,()=> {
  console.log(`server is running at PORT ${PORT}`)
})