import mongoose from "mongoose";


const addressSchema =new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  address: [
    {
      city: { type: String, required: true },
      area: { type: String, required: true },
      street: { type: String, required: true },
      build: {
        name: { type: String },
        number: { type: String }
      },
      floor: { type: String, required: true },
      partment: { type: String, required: true },
      mark : { type: String},
    }
  ]
});

const Address = mongoose.models?.Address || mongoose.model("Address" , addressSchema)
export default Address
