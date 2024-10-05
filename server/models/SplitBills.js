import mongoose, { Schema } from 'mongoose'


const splitSchema = new Schema({
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    details: [{
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders",
        },
        amountOwed: {
            type: Number,
            required: true,
        },
        email: {
            type: [String],
            required: true,
        },
        phone: {
            type: [String],
            required: true,
        },
        paymentStatus: {
            type: [Boolean],
            default: false,
        },
        paymentDate: {
            type: Date,
        },
    }],

})

export default mongoose.model("splitBills", splitSchema)