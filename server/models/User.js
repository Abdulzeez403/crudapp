 const mongoose = require("mongoose");
 const UserDetail = new mongoose.Schema({

 filmName:{
  type: String,
  required: true,
 },

 filmReview:{
  type: String,
  required: true,
 }
 });

 const models =mongoose.model("crudDetail",UserDetail)
 module.exports = models;