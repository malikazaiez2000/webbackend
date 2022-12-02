const route=require('express').Router()
const routeModel=require('../models/user.model')

route.post('/register',(req,res,next)=>{
    routeModel.register(req.body.username,req.body.email,req.body.password)
    .then((user)=>res.status(200).json({user:user,msg:"registered"}))
    .catch((err)=>res.status(400).json({error:err}))   
    
})

route.post('/login',(req,res,next)=>{
    routeModel.login(req.body.email,req.body.password)
    .then((token)=>res.status(200).json({token:token}))
    .catch((err)=>res.status(400).json({error:err}))   
    
})


module.exports=route