const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  password: { type: String, select: false },
  email: {type: String, select: false },
  username: { type: String, required: true },
  searches: [{ type: Schema.Types.ObjectId, ref: "Search" }],

},
  {timestamps: {createdAt: 'created_at'}}
);

module.exports = mongoose.model("User", UserSchema);