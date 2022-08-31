const mongoose = require('mongoose');
 
const emailSchema = new mongoose.Schema({
 email : {
  type : String
 }
} , {timestamps : true , versionKey : false})

module.exports = mongoose.model('email' , emailSchema)