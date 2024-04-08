import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
  items: [
    {
      productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
      productName: {type: String, required: true},
      quantity: {type: Number, required: true},
      size: {type: String, required: true},
      notes: {type: String,},
      totalPrice: {type: Number, required: true},
      offer_value: {type: Number},
      total_After_Discount: {type: Number,},
    },
  ],
  total_cart_price: {type: Number,},
  total_cart_quantity: {type: Number,},
  total_Cart_After_Discount: {type: Number,}
})
cartSchema.pre('save', function () {
  let total_cart_price = 0
  let total_cart_quantity = 0
  let total_Cart_After_Discount = 0
  this.items.forEach(item => {
    total_cart_price = total_cart_price + item.totalPrice
    total_cart_quantity = total_cart_quantity + item.quantity
    total_Cart_After_Discount = total_Cart_After_Discount + (item.total_After_Discount ? item.total_After_Discount : item.totalPrice)
  })
  this.total_cart_price = total_cart_price
  this.total_cart_quantity = total_cart_quantity
  this.total_Cart_After_Discount = total_Cart_After_Discount
})
const Cart = mongoose.models?.Cart || mongoose.model("Cart", cartSchema);
export default Cart;