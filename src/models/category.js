import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name:{type:String,required: true , unique:true},
  image:{
    scr:{type : String},
    id:{type : String},
  },
  _isAvailable: {type: Boolean, default: true},
  createdAt: {type: Date, default: Date.now},
  createdBy: {type: mongoose.Types.ObjectId,ref :"User" },
  
} , {timestamps :true  , toObject :{virtuals :true} , toJSON :{virtuals :true}})

const Category =mongoose.models?.Category|| mongoose.model('Category', categorySchema)
export default Category;