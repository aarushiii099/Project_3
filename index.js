const express=require("express")
const server=express()
const bp=require("body-parser")
const mongoose=require("mongoose")
const adminRoutes=require("./routes/AdminRoutes")
const userRoutes=require("./routes/UserRoutes")


server.use(bp.json())
server.use("/Admin",adminRoutes)
server.use("/User",userRoutes)


mongoose.connect("mongodb://localhost:27017/bookess").then((res)=>console.log("Connected to DB!")).catch((err)=> console.log(err));

server.listen(3001,()=>console.log("server started"))

