const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  
    description: {
      type: String,
      required: true,
    },
    descriptionCourte: {
        type: String,
        required: true,
      },
  
    category: {
      type: String,
      required: true,
    },
    fichTechnique:{
        type:String,
        
    },
 

   
    images: [
      {
        public_id: String,
        url: String,
      },
    ],

  
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);