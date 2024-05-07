import mongoose from "mongoose";
import Category from "@/models/category";

const ProductSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true,},
  slug: {type: String, required: true, unique: true,},
  product_available :{type: Boolean, default: true},
  description: {type: String, required: true},
  image:{
    scr:{type : String},
    id:{type : String},
  },
  show: {type: Boolean, default: false},
  
  price: [
    {
      size: {type: String, required: true},
      value: {type: Number, required: true},
      offer: {type: Boolean, default: false},
      value_of_offer: {type: Number, default: 0},
      final_price: {type: Number},
      quantity: {type: Number, default: 0},
      sell_items: {type: Number, default: 0},
      _isAvailable: {type: Boolean, default: true},
    },
  ],
  brand: {type: mongoose.Types.ObjectId, ref:"Brand"},
  category: {type: mongoose.Types.ObjectId, ref:"Category"},
  createdAt: {type: Date, default: Date.now},
  createdBy: {type: mongoose.Types.ObjectId, ref:"User"},
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});
const Product = mongoose.models?.Product || mongoose.model('Product', ProductSchema);
export default Product;