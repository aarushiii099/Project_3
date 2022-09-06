const express=require("express")
const router=express.Router()
const Controllers=require("../controllers/controller")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")



router.get("/getBooks",Controllers.userGetBooks)
router.post("/signUp",Controllers.userSignUp)
router.post("/signIn",Controllers.userSignIn)
//For all the routes with authorize middleware, kindly give token generated at the time of Sign-in of User.
//Give "generatedToken" through Postman.
router.put("/likeBook/:id",authorize,Controllers.userLikeBook)
router.put("/readLater/:id",authorize,Controllers.userReadLater)
router.get("/getLikedBooks",authorize,Controllers.userLikedBooks)
router.get("/getReadLaterBooks",authorize,Controllers.userReadLaterBooks)
router.put("/logout",Controllers.userLogOut)



function authorize (req,res,next){
    try{

    let reqToken = req.headers['authorization'];
    const Token = reqToken.replace("Bearer ", '');
    const verifiedtoken = jwt.verify(Token, "martini");
    console.log(verifiedtoken)
    req.token = verifiedtoken;
    console.log(req.token)
    next();
    return;
    }
    catch(err){
        // console.log(err);
        res.send({msg:"you are not authorized",status:false});
    }
}



module.exports = router;