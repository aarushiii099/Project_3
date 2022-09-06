const mongoose=require("mongoose")
const Schema=mongoose.Schema

const BookSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    edition:{
        type:Number,
        required:true
    },
    bookId:{
        type:Number,
        required:true
    },
    liked:{
        type:Boolean,
        required:true
    },
    readLater:{
        type:Boolean,
        required:true
    }
})

const UserSchema=new Schema({
    email:{
        type:String,
        required:[true,"enter email ! email is mandatory"],
        unique:true,
        validate:{
            validator:function(exp){
            return /[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}$/.test(exp)
            },
            message:property=>`${property.value} is not valid` 
        }
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})

const AdminSchema=new Schema({
    email:{
        type:String,
        required:[true,"enter email ! email is mandatory"],
        unique:true,
        validate:{
            validator:function(exp){
            return /[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}$/.test(exp)
            },
            message:property=>`${property.value} is not valid` 
        }
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:String,
        required:true
    }
})

const BookModel=mongoose.model("BookModel",BookSchema)

const UserModel=mongoose.model("UserModel",UserSchema)

const AdminModel=mongoose.model("AdminModel",AdminSchema)










module.exports={BookModel,UserModel,AdminModel}
