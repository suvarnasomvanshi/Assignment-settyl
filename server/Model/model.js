import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const itemListSchema = new Schema({

    name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required: true,
    },
    isAuctioned: {
        type: Boolean,
        default: false,
    },

})






const userSchema = new Schema({
    
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        length:8,
    },
    itemList:[itemListSchema],
    transctionhistory:[{
        date:{
            type:Date,
        },
        description :String,
        amount: Number,
    }]


})

export default mongoose.model('User',userSchema)

