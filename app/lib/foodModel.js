const {mongoose} = require("mongoose");

const foodSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    image:String,
    resto_id: mongoose.Schema.Types.ObjectId
})

export const foodModel = mongoose.models.foods||mongoose.model("foods",foodSchema);