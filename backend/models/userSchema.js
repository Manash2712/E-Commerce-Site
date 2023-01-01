import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [50, "Name must be less than 50"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minLength: [8, "Password must be atleast 8 characters"],
            select: false,
            //by select as false by default this pw field will not come when return user from db.
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER,
        },
        forgotPasswordRoken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
