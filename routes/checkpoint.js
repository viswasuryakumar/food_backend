const express = require("express");
const dotenv = require("dotenv")
const ItemModel = require('../models/Item')
const CheckpointModel = require('../models/Checkpoint')
dotenv.config();

const router = express.Router();

router.post('/create-checkpoint', async (req, res) => {
  try {
    const { condition, storageTemperature, spoilage, userId ,location } = req.body;

    console.log(req.body)
    // Create a new checkpoint
    const newCheckpoint = await CheckpointModel.create({
      condition,
      storageTemperature,
      spoilage,
      currentLocation:location,
      user: userId,
    });

    // Update the corresponding item's checkpoints array with the new checkpoint's ID
    const itemId = req.body.itemId; // Make sure to send itemId from the frontend
    await ItemModel.findByIdAndUpdate(
      itemId,
      { $push: { checkpoints: newCheckpoint._id } },
      { new: true }
    );

    res.status(201).json({ success: true, data: newCheckpoint });
  } catch (error) {
    console.error('Error creating checkpoint:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;