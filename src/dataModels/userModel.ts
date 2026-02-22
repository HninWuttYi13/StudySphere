import mongoose, { Schema } from "mongoose";
interface IUser{
    username: string,
    email: string,
    password: string
}
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type:String,
        required: true,
        select: false,
        minlength: 6
    },
   
},
{timestamps: true}
)
const User = mongoose.model<IUser>("User", userSchema);
export default User;