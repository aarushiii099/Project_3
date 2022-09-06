const {BookModel,UserModel,AdminModel}=require("../models/model")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "jamesbond";
const privateKey2= "martini"

const Controllers = {};

//Controllers for Admin Routes
Controllers.adminCreateBooks=async function (req,res){
    const data=req.body
    try{
        const result=await BookModel.create({
            title:data.title,
            author:data.author,
            edition:data.edition,
            bookId:data.bookId,
            liked:data.liked,
            readLater:data.readLater
        })
        res.status(201).send({msg:"Book Created Successfully!",status:true});
    }
    catch(err){
        res.status(404).send({msg:"unknown error occured",status:false,err:err});
    }
}


Controllers.adminGetBooks=async function(req,res){
    try{
        const result=await BookModel.find({});
        res.send(result)
    }
    catch(err){
        res.send({msg:"Error occured",error:err})
    }
}

Controllers.adminSignup=async function (req,res){
    const data = req.body;
    try{
        const user = await AdminModel.findOne({email:data.email});
        if(user){
            res.status(404).send({msg:"user already exists", status:false});
        }
        else{
            const hashedpwd = await bcrypt.hash(data.password,5);
            const result=await AdminModel.create({
                email:data.email,
                password:hashedpwd,
                admin:data.admin
            })
            res.status(201).send({msg:"signup successfull",status:true});
        }
    }
    catch(err){
        res.status(404).send({msg:"unknown error occured",status:false,err:err});
    }

}

Controllers.adminSignin=async function(req,res){
    const data=req.body
    try{
        const user=await AdminModel.findOne({email:data.email})
       if(user){
       const comparison=await bcrypt.compare(data.password,user.password)
       console.log(comparison)
       if(comparison){
        const generatedtoken=jwt.sign({email:data.email},privateKey,{expiresIn:'72h',algorithm:'HS512'})//generation of token 
        console.log(generatedtoken)
        res.status(200).send({msg:"login successfull",status:true,token:generatedtoken})//this token can then be set in local storage of browser
       }
       else{
        res.status(404).send({msg:"login is not successfull,check your password",status:false})
       }}
       else{
        res.status(404).send({msg:"login is notsuccessfull,email does not exists",status:false})
       }
    }
    catch(err){
        res.status(404).send(err)
    }
}

 

Controllers.adminUpdateEdition=async function(req,res){
    const data=req.body
    const id=req.params.id

    try{
        const result=await BookModel.updateOne({bookId:id},data);
        res.send(result)
    }
    catch(err){
        res.send({msg:"Error occured",error:err})
    }
}

Controllers.adminDeleteBook=async function(req,res){
    const id=req.params.id
    try{
        const result = await BookModel.deleteOne({bookId:id});
        res.send(result);

    }
    catch(err){
        res.send({msg:"Error occured",error:err})
    }
}

Controllers.adminCreateUser=async function(req,res){
    const data = req.body;
    try{
        const user = await UserModel.findOne({email:data.email});
        if(user){
            res.status(404).send({msg:"user already exists", status:false});
        }
        else{
            const hashedpwd = await bcrypt.hash(data.password,5);
            const result=await UserModel.create({
                email:data.email,
                password:hashedpwd,
                username:data.username
            })
            res.status(201).send({msg:"signup successfull",status:true});
        }
    }
    catch(err){
        res.status(404).send({msg:"unknown error occured",status:false,err:err});
    }

}

Controllers.adminUpdateUserEmail=async function(req,res){
    const data=req.body;
    const EMAIL=req.params.email
    // try{
    //     const result = await UserModel.updateOne({email:EMAIL},{
    //         $set:
    //         {
    //             email:data.email
    //         }
    //     });
    //     res.send(result);
    // }
    // catch(err){
    //     res.send(err);
    // }

    try{
        const result=await UserModel.findOne({email:EMAIL})
        console.log(result)
        result.email=data.email
        result.save().then((res)=>console.log("updated!")).catch((err)=>console.log(err))

    }
    catch(err){
            res.send(err);
    }
}

Controllers.adminUserDetails=async function(req,res){
    const EMAIL=req.params.email
    try{
        const result=await UserModel.findOne({email:EMAIL});
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
}

Controllers.adminDeleteUser=async function(req,res){
    const EMAIL=req.params.email
    try{
        console.log(EMAIL)
        const result = await UserModel.deleteOne({email:EMAIL});
        console.log(result)
        res.send(result);
    }
    catch(err){
        res.send({msg:"Error occured",error:err})
    }
}

Controllers.adminLogOut=async function(req,res){
    res.send({msg:"Admin has been logged out! Please click on the button below to navigate to home page."})
    //A button for navigating to home page can be created in UI after calling this route.
}


//Controllers for User Routes

Controllers.userGetBooks=async function(req,res){
    try{
        const result=await BookModel.find({});
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
}

Controllers.userSignUp=async function(req,res){
    const data = req.body;
    try{
        const user = await UserModel.findOne({email:data.email});
        if(user){
            res.status(404).send({msg:"user already exists", status:false});
        }
        else{
            const hashedPassword = await bcrypt.hash(data.password,5);
            const result=await UserModel.create({
                email:data.email,
                password:hashedPassword,
                username:data.username
            })
            res.status(201).send({msg:"signup successfull",status:true});
        }
    }
    catch(err){
        res.status(404).send({msg:"unknown error occured",status:false,err:err});
    }   
}

Controllers.userSignIn=async function(req,res){
    const data=req.body
    try{
        const user=await UserModel.findOne({email:data.email})
       if(user){
       const comparison=await bcrypt.compare(data.password,user.password)
       console.log(comparison)
       if(comparison){
        const generatedToken=jwt.sign({email:data.email},privateKey2,{expiresIn:'72h',algorithm:'HS512'})//generation of token 
        console.log(generatedToken)
        res.status(200).send({msg:"login successfull",status:true,token:generatedToken,username:user.username})//This username can be rendered in the UI!
       }
       else{
        res.status(404).send({msg:"login is not successfull,check your password",status:false})
       }}
       else{
        res.status(404).send({msg:"login is notsuccessfull,email does not exists",status:false})
       }
    }
    catch(err){
        res.status(404).send(err)
    }
}

Controllers.userLikeBook=async function(req,res){
    const bookid=req.params.id

    try{
        const result=await BookModel.findOne({bookId:bookid})
        result.liked=true
        result.save().then((res)=>console.log("Updated!")).catch((err)=>console.log(err))
        res.send(result)
    }
    catch(err){
        res.send({msg:"Error Occured",error:err})
    }
}

Controllers.userReadLater=async function(req,res){
    const bookid=req.params.id

    try{
        const result=await BookModel.findOne({bookId:bookid})
        result.readLater=true
        result.save().then((res)=>console.log("Updated!")).catch((err)=>console.log(err))
        res.send(result)
    }
    catch(err){
        res.send({msg:"Error Occured",error:err})
    }
}

Controllers.userLikedBooks=async function(req,res){
    try{
        const result=await BookModel.find({liked:true})
        res.send(result)

    }
    catch(err){
        res.send({msg:"Records couldn't be fetched",error:err})
    }
}

Controllers.userReadLaterBooks=async function(req,res){
    try{
        const result=await BookModel.find({readLater:true})
        res.send(result)

    }
    catch(err){
        res.send({msg:"Records couldn't be fetched",error:err})
    }
}

Controllers.userLogOut=async function(req,res){
    try{
        const result1=await BookModel.updateMany({liked:true},{liked:false})
        const result2=await BookModel.updateMany({readLater:true},{readLater:false})
        res.send({msg:"User has been logged out! Please click on the button below to navigate to home page."})
        //A button for navigating to home page can be created in UI after calling this route.
    }
    catch(err){
        res.send({msg:"User couldn't be logged out",error:err})
    }
    
}



module.exports = Controllers;