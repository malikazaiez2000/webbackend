const express=require('express')
const patientRoute=require('./routers/patient.route')
const userRoute=require('./routers/user.route')
const adminRouter=require('./routers/admin.route')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader('Access-Control-Request-Method',"*")
    res.setHeader('Access-Control-Allow-Headers',"*")
    next()
}) 

app.use('/',patientRoute)
app.use('/',userRoute)
app.use('/admin',adminRouter)






app.listen(3000,()=>console.log('server running in port 3000'))