import mongoose, { Schema } from "mongoose";

const PublishSchema = new Schema(
    {
        RestroMail: {
            type: String,
            required: [true, "RestroMail is required"],
        },
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        website: {
            type: String,
            default: null,
        },
        images: {
            type: [String],
            default: [],
        },
        verificationStatus: {
            type: String,
            enum: ["pending", "verified", "rejected"],
            default: "pending",
        },
        documents: {
            panCard: {
                type: Number,
                immutable: true,
            },
            aadharCard: {
                type: Number,
                immutable: true,
            },
        },
        menu: [
            {
                name: {
                    type: String,
                    required: [true, "Menu item name is required"],
                },
                description: {
                    type: String,
                    required: [true, "Menu item description is required"],
                },
                price: {
                    mrp: {
                        type: Number,
                        required: [true, "MRP price is required"],
                    },
                    org: {
                        type: Number,
                        required: [true, "Original price is required"],
                    },
                    discountPercent: {
                        type: Number,
                    },
                },
                category: {
                    type: String,
                    required: [true, "Menu item category is required"],
                },
                image: {
                    type: String,
                    default: null,
                },
                ingredients: {
                    type: [String],
                    default: [],
                },
            },
        ],
        Location: {
            type: String,
            required: true
        },
        product:{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            default: 'Restaurant'
        }
    },

    {
        timestamps: true,
    }
);

export default mongoose.model("Restaurant", PublishSchema);
