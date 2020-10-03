import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true,
};

const satellexSchema = new.mongoose.Schema({
    username: requiredString,
    satList: {
        type: Array,
        required: true,
    },
});

export default mongoose.model("Satellex", satellexSchema);
