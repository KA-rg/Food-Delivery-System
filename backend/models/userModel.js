import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData:{type:Object,default:{}}
}, { minimize: false }) //By default, Mongoose removes (minimizes) empty objects from the document before saving it to MongoDB.

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;