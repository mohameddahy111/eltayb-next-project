import mongoose from "mongoose";

const frindesList = new mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, ref: 'User'},
  friends: [
    {
      frindId: {type: mongoose.Types.ObjectId, ref: 'User'},
      frindAt: {type: Date, default: Date.now()},
    }
  ]
}, {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}});
const Frindes = mongoose.models?.Frindes || mongoose.model('Frindes', frindesList);
export default Frindes;