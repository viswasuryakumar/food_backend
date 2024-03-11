const express = require("express");
const dotenv = require("dotenv")
const ItemModel = require('../models/Item')
const qr = require('qrcode');
dotenv.config();

const router = express.Router();

router.post('/create-item', async (req, res) => {
    try {
      const { role, name, quantity, condition, storageTemperature, spoilage, originLocation, harvestDate } = req.body;
        
      console.log(req.body)
      // Check if the user has the farmer role
      if (role !== "Farmer") {
        return res.status(403).json({ success: false, error: "Forbidden: Only farmers can create items" });
      }

      // Create a new item using the provided data and save it to the database
      const newItem = await ItemModel.create({
        name,
        quantity,
        condition,
        storageTemperature,
        spoilage,
        originLocation,
        harvestDate,
      });
      const qrCodeData = `http://localhost:5173/view-item/${newItem._id}`;
      const qrCodeImage = await qr.toDataURL(qrCodeData);

      // Save the QR code in the item model
      newItem.qrCode = qrCodeImage;
      await newItem.save();
      console.log("Item created successfully",newItem);
      return res.status(201).json({ success: true, data: newItem });
     
    } catch (err) {
        console.log(err)
      return res.status(500).json({ success: false, error: err });
    }
  });

  router.get('/get-items', async (req, res) => {
    try {
      const items = await ItemModel.find().populate({
        path: 'checkpoints',
        populate: {
          path: 'user',
          model: 'user', // Assuming you have a User model
        },
      });
  
      return res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/get-item/:itemId', async (req, res) => {
    try {
      let { itemId } = req.params;
      itemId = itemId.substring(1);
      const item = await ItemModel.findById(itemId).populate({
        path: 'checkpoints',
        populate: {
          path: 'user',
          model: 'user', // Assuming you have a User model
        },
      });
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      return res.status(200).json(item);
    } catch (error) {
      console.error('Error fetching item:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
