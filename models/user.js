import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true,
};

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9_-]+$/, "is invalid"],
            index: true,
        },
        password: requiredString,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
