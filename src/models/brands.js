import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name:{type:String,required: true , unique:true},
  image:{
    scr:{type : String},
    id:{type : String},
  },
  _isAvailable: {type: Boolean, default: true},
  category: {type: mongoose.Types.ObjectId,ref :"Category" },
  createdAt: {type: Date, default: Date.now},
  createdBy: {type: mongoose.Types.ObjectId,ref :"User" },
  
} , {timestamps :true  , toObject :{virtuals :true} , toJSON :{virtuals :true}})

const Brand =mongoose.models?.Brand|| mongoose.model('Brand', brandSchema)
export default Brand