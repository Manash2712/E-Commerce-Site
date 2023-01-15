import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import config from '../config/index'

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
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true,
    }
);

// encrypt pw before saving it into DB
userSchema.pre("save", async function (next) {
    if (!this.modified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// add more features directly to the schema

userSchema.methods = {
    //compare password
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    },
    // generate JWT TOKEN
    getJwtTsoken: function(){
        return JWT.sign(
            {
                _id: this._id,
                role: this.role 
            },
            config.JWT_SECRET,
            {
                // this value should come from env variable
                expiresIn: config.JWT_EXPIRY
            }
        )
    }
};




export default mongoose.model("User", userSchema);
