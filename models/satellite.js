import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true,
};

const satSchema = new mongoose.Schema(
    {
        category: requiredString,
        satname: requiredString,
        satid: {
            type: Number,
            required: true,
        },
        launchDate: requiredString,
        source: requiredString,
        launchSite: requiredString,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Sat", satSchema);
