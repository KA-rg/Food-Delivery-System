import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true},
    image: { type: String, required: true },
    category:{ type:String, required:true}
})
//Since the mpdel is created just once, we check if model is already there with name food or else new model created.
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
                                                        // model name is food
//Else: OverwriteModelError: Cannot overwrite `food` model once compiled.

export default foodModel;