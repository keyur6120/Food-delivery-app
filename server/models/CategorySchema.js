import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required: true ,
        unique : true,
        trim: true
    },
    image :{
        type : String,
        required: true 
    },
    items :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Food"
        }
    ],
    off : {
        type : String
    }
})

export default mongoose.model("category",categorySchema)