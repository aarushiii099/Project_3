const express=require("express")
const router=express.Router()
const Controllers=require("../controllers/controller")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


router.post("/createBooks",Controllers.adminCreateBooks)

router.post("/signUp",Controllers.adminSignup)

router.post("/signIn",Controllers.adminSignin)

router.get("/getBooks",Controllers.adminGetBooks)

//For all the routes with authorize middleware, kindly give token generated at the time of Sign-in of Admin.
//Give "generatedtoken" through Postman.

router.put("/updateEdition/:id",authorize,Controllers.adminUpdateEdition)//here,An id corresponding to the book whose edition is to be changed will be given!

router.delete("/deleteBook/:id",authorize,Controllers.adminDeleteBook)//here,An id corresponding to the book which is to be deleted will be given!

router.post("/createUserAccount",authorize,Controllers.adminCreateUser)//Route for creating new user account by Admin!

router.put("/updateUserEmail/:email",authorize,Controllers.adminUpdateUserEmail)//Route for updating email in case email id of user changes!

router.get("/readUserDetails/:email",Controllers.adminUserDetails)//Route for reading User Account Details.

router.delete("/deleteUser/:email",Controllers.adminDeleteUser)//Route for deleting user account by Admin!

router.get("/logout",Controllers.adminLogOut)




function authorize (req,res,next){
    try{

    let reqtoken = req.headers['authorization'];
    const token = reqtoken.replace("Bearer ", '');
    const verifiedToken = jwt.verify(token, "jamesbond");
    req.token = verifiedToken;
    next();
    return;
    }
    catch(err){
        // console.log(err);
        res.send({msg:"you are not authorized",status:false});
    }
}




module.exports = router;