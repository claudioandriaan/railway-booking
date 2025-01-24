import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});
export default mongoose.model('Client', ClientSchema);