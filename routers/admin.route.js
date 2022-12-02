const route=require('express').Router()
const adminModel=require('../models/admin.model')

route.post('/register',(req,res,next)=>{
    adminModel.registerAdmin(req.body.username,req.body.email,req.body.password)
    .then((user)=>res.status(200).json({user:user,msg:"registered"}))
    .catch((err)=>res.status(400).json({error:err}))   
    
})

route.post('/login',(req,res,next)=>{
    adminModel.loginadmin(req.body.email,req.body.password)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json({error:err}))   
    
})


module.exports=route