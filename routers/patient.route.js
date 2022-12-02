const route=require('express').Router()
const patientModel = require('../models/patient.model')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const { application } = require('express')





var privateKey=process.env.PRIVATE_KEY

verifyTokenAdmin=(req,res,next)=>{
    let token=req.headers.authorization
    let role=req.headers.role
    if(!token || role!='admin'){
        res.status(400).json({msg:'access rejected !'})
    }

    try{
      jwt.verify(token,privateKey)
      next()

    }catch(e){

        res.status(400).json({msg:e})

    }

}








verifyToken=(req,res,next)=>{
    let token=req.headers.authorization
    if(!token){
        res.status(400).json({msg:'access rejected !'})
    }

    try{
      jwt.verify(token,privateKey)
      next()

    }catch(e){

        res.status(400).json({msg:e})

    }

}
var secretkey=process.env.SECRET_KEY
var clientkey=process.env.CLIENT_KEY

verifiSecretClient=(req,res,next)=>{
    let sk=req.params.secret
    let ck=req.params.client
    
    if(sk==secretkey && ck== clientkey){
        next()
    }else{
        res.status(400).json({error:"you can't access to this route because you didn't send the secret key and client key"})
    
}
}

route.get('/',(req,res,next)=>{
    patientModel.testConnect().then((msg)=>res.json(msg)).catch((err)=>res.json(err))
})

route.post('/addpatient',verifyTokenAdmin,(req,res,next)=>{
    patientModel.postNewPatient(req.body.firstname,req.body.lastname,req.body.email,req.body.age,req.body.phone)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))

    
})

route.get('/patients', verifyToken,(req,res,next)=>{
    
        
    
        patientModel.getAllPatients()
        .then((doc)=>res.status(200).json(doc))
        .catch((err)=>res.status(400).json(err))
    
       
    
   
})

route.get('/patient/:id',verifyToken,(req,res,next)=>{
    patientModel.getOnePatient(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.delete('/patient/:id',verifyTokenAdmin,(req,res,next)=>{
    patientModel.deleteOnePatient(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.patch('/patient/:id',verifyTokenAdmin,(req,res,next)=>{
    patientModel.updateOnePatient(req.params.id,req.body.firstname,req.body.lastname,req.body.email,req.body.age,req.body.phone)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

module.exports=route
