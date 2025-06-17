const {mongoose} = require("mongoose");

const orderSchema= new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    image:String,
    resto_id: mongoose.Schema.Types.ObjectId,
})

export const ordermodel = mongoose.models.order||mongoose.model("order",orderSchema);