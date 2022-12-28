const userModel= require('../models/userModel');
const jwt= require('jsonwebtoken');
const mongoose= require('mongoose');
const { use } = require('../routes/route');



const signUpUser= async function(req, res)
{
    try
    {
        let data= req.body;
        // if(typeOf(data.Name)!=='string') return res.status(400).send({status: false, message:"Name must be in string"});
        // if(typeOf(data.phoneNumber)!=='number') return res.status(400).send({status: false, message:"Number must be in number"});
        // if(typeOf(data.Password)!=='number') return res.status(400).send({status: false, message:"Password must be in string"});
        const creatingUser= await userModel.create(data);
        return res.status(201).send({status: true, message:"Created", user: creatingUser});
    }
    catch(err)
    {
        console.log(err);
        //return
        res.status(500).send({status: false, message: err.message});
    }
}

const login= async function(req, res)
{
    try
    {
        let user= req.body;
        if(Object.keys(user)==0) return res.status(400).send({status: false, message:"Please provide some data"});

        let phNumber= req.body.phoneNumber;
        let password= req.body.Password;

        let findUser= await userModel.findOne({phoneNumber: phNumber, Password: password});
        if(!findUser) return res.status(400).send({status: false, message:"Phone Number or Password is incorrect"});
        
        let token= jwt.sign({Name: findUser.Name, phoneNumber: findUser.phoneNumber, Password: findUser.Password}, "SecurityCode", {expiresIn:".5h"});
        res.setHeader("x-api-key", token);
        res.status(201).send({status: true, message:"Login", token: token});

    }
    catch(err)
    {
        console.log(err);
        //return
        res.status(500).send({status:false, message: err.message});
    }
}

const getUser= async function(req, res)
{
    try
    {
        const name= req.query;
        if(name.length==0) return res.status(400).send({status: false, message: "Please provide the name"});
        const getData= await userModel.find({Name: name}).select({Name:1, phoneNumber:1, Password:1});
        res.status(200).send({status: true, data: getData});
    }
    catch(err)
    {
        console.log(err);
        //return
        res.status(500).send({status:false, message: err.message});
    }
}

const updateUser= async function(req, res)
{
    try
    {
        const data= req.body;
        const phNumber= req.params.phoneNumber;
        const findUser= await userModel.find({phoneNumber: phNumber});
        if(!findUser) return res.status(404).send({status: false, message: "User no found"});

        const updatingUser= await userModel.findOneAndUpdate({phoneNumber: phNumber}, {...data}, {new: true});
        res.status(200).send({status: true, message: "User Updated", data: updatingUser});
    }
    catch(err)
    {
        console.log(err);
        //return
        res.status(500).send({status:false, message: err.message});
    }
}

const updatePassword= async function(req, res)
{
    try
    {
        //old password:
        //new password:
        const data= req.body;
        if((!data.oldPass) || (data.oldPass.length==0)) return res.status(400).send({status: false, message:"Please provide the old Password"});
        if((!data.newPass) || (data.newPass.length==0)) return res.status(400).send({status: false, message:"Please provide the New Password"});

        let token= req.headers["x-api-key"];
        let decodeToken= jwt.verify(token, "SecurityCode");
        if(decodeToken.Password != data.oldPass) return req.status(400).send({status:false, message: "Old Password does not match"});
        const update= {};
        update.Name= decodeToken.Name;
        update.phoneNumber= decodeToken.phoneNumber;
        update.Password= data.newPass;
        const updatingPassword= await userModel.findOneAndUpdate({phoneNumber: decodeToken.phoneNumber}, {...update}, {new: true});
        res.status(200).send({status: true, message: "User Updated", data: updatingPassword});
    }
    catch(err)
    {
        console.log(err);
        //return
        res.status(500).send({status:false, message: err.message});
    }
}

module.exports.signUpUser= signUpUser;
module.exports.login= login;
module.exports.getUser= getUser;
module.exports.updateUser= updateUser;
module.exports.updatePassword= updatePassword;