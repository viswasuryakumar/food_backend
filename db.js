const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://viswasurya01:h7tBKGr3gqe1QAng@cluster0.0ecxwdw.mongodb.net/food_tracker?retryWrites=true&w=majority&appName=Cluster0";


const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
