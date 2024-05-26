const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  utc_time: { type: Date, required: true },
  operation: { type: String, required: true },
  basecoin:{type: String, required: true},
  quotecoin: {type: String, required: true},
  amount: {type: Number, require: true},
  price: {type: Number, required: true}
});

const data = mongoose.model('Data', dataSchema);

module.exports = data;

