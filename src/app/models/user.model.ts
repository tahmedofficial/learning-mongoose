import { model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";
import Note from "./notes.model";

const adderssSchema = new Schema<IAddress>({
    city: { type: String, required: true },
    street: { type: String },
    zip: { type: String }
}, {
    _id: false
})

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>({
    firstName: { type: String, required: true, trim: true, minlength: [5, "Must be at least 5"], maxlength: 10 },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        unique: [true, "Dupicate email"],
        required: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Invalid email"]
        // validate: {
        //     validator: function (value) {
        //         return /^[^\s@]+@[^\s@]+\.[^\@]+$/.test(value)
        //     },
        //     message: function (props) {
        //         return `Email ${props.value} is not valid email`
        //     }
        // }
    },
    password: { type: String, required: true },
    age: { type: Number, required: true, min: 18, max: 60 },
    role: {
        type: String,
        enum: {
            values: ["admin", "user", "owner"],
            message: "Role is not valid"
        },
        default: "user",
        lowercase: true
    },
    address: { type: adderssSchema }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// userSchema.index({ email: 1 }, { unique: true });
userSchema.method("hashPassword", async function hashPassword(plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
})

userSchema.static("hashPassword", async function hashPassword(plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
})

userSchema.post("findOneAndDelete", async function (doc) {
    console.log(doc);
    await Note.deleteMany({ userId: doc._id })
})

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`
})

export const User = model<IUser, UserStaticMethods>("User", userSchema)