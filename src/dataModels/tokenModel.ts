import mongoose, {Schema} from 'mongoose';
interface IToken  {
    user: mongoose.Types.ObjectId
    refreshToken: string
}
const tokenSchema = new Schema<IToken>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    refreshToken: {
        type: String,
        select: false
    }
})
const Token = mongoose.model<IToken>("Token", tokenSchema);
export default Token;