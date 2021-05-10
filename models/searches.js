const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Populate = require("../utils/autopopulate");

const SearchSchema = new Schema({
  search: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
}, {timestamps: {createdAt: 'created_at'}
    });
    
    // Always populate the author field
    SearchSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

module.exports = mongoose.model("Search", SearchSchema);