const { Schema,model}=require("mongoose")

const UserSchema=new Schema({
    fullname:{
        type: String,
        required: true,
        trim: true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
mobile:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    match:/^\d{10}$/
},
password:{
    type:String,
    required:true,
    trim:true,
    
}

},{
    timestamps:true
})

const UserModel=model("user",UserSchema)

module.exports=UserModel