import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobile: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    _isActive: {type: Boolean, default: false},
    _isBlocked: {type: Boolean, default: false},
    _isAdmin: {type: Boolean, default: false},
    _isVeryfid: {type: Boolean, default: false}
  },
  {timestamps: true}
);

userSchema.pre(["save" , "findOneAndUpdate"] , function () {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});
userSchema.pre('findOneAndUpdate', function () {
  if (this._update.password) {
    this._update.password = bcrypt.hashSync(this._update.password, 8);
  }
});
userSchema.pre("insertMany", function () {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
