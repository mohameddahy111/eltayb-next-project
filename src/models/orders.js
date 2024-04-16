import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    seenBy: { type: mongoose.Types.ObjectId, ref: "User" },
    seenAt: { type: Date },
    seen: { type: Boolean, default: false },
    // enums
    staut_order: { type: String, default: "In processing" },
    items: [Object],
    shipping_Details: { type: Object },
    paymentMethod: { type: String, default: "Cash" },
    tax: { type: Number, default: 15 },
    delivery: { type: Number, default: 20 },
    total_price: { type: Number },
    toatl_After_Descount: { type: Number },
    payment_total: { type: Number, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

orderSchema.pre("save", function () {
  this.payment_total = parseFloat(
    this.toatl_After_Descount +
      (this.total_price * this.tax) / 100 +
      this.delivery
  ).toFixed(2);
});

const Oredr = mongoose.models?.Oredr || mongoose.model("Oredr", orderSchema);
export default Oredr;
