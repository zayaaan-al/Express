import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: {type: String},
    Phone: {type: Number},

})

export default mongoose.models.Datas||mongoose.model('datas',dataSchema);