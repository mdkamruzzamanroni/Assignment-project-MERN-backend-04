const ProfileModel=require("../models/ProfileModel");
var jwt = require('jsonwebtoken');


exports.CreateProfile=(req,res)=>{
let reqBody= req.body;
ProfileModel.create(reqBody,(error,data)=>{
    if(error){
        res.status(400).json({status:"fail",data:error})
    }
    else{
        res.status(200).json({status:"success",data:data})
    }
})
}

exports.UserLogin=(req,res)=>{
    let UserName= req.body['UserName'];
    let Password= req.body['Password'];
    
    ProfileModel.find({UserName:UserName,Password:Password},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error})
        }

        else{
            if(data.length>0){
                // create auth token
                let payload={exp: Math.floor(Date.now() / 1000) + (24*60 * 60), data:data[0]
                }
                let token = jwt.sign(payload, 'secretkey123456');

                res.status(200).json({status:"success",token:token,data:data[0]})
            }

        else{
            res.status(401).json({status:"unauthorized"})
        }
        }
    })
    }