import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.models.userdata || mongoose.model("userdata", UserSchema);

export { UserModel };