const jwt= require('jsonwebtoken');
const userModel= require('../models/userModel');

const authenticate= function(req, res, next)
{
    try
    {
        let token= req.headers["x-api-key"];
        if(!token) return res.status(400).send({status: false, message: "token is not present"});
        let decodeToken= jwt.verify(token, "SecurityCode");
        if(!decodeToken) return res.status(400).send({status: false, message: "Invalid token"});
        
        next();
    }
    catch(err)
    {
        console.log(err);
        //return
        res.status(500).send({status:false, message: err.message});
    }
}
module.exports.authenticate= authenticate;