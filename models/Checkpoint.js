// models/CheckpointModel.js
const mongoose = require('mongoose');

const CheckpointSchema = new mongoose.Schema({
  condition: {
    type: String,
    required: true,
  },
  storageTemperature: {
    type: String,
    required: true,
  },
  spoilage: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true,
  },
  createdOn:{
    type:Date,
    default:Date.now
  }
});

const CheckpointModel = mongoose.model('checkpoint', CheckpointSchema);

module.exports = CheckpointModel;
