const mongoose=require('mongoose')
const Joi=require('joi')

const schemaValidation=Joi.object({
    firstname:Joi.string().alphanum().min(2).max(20).required(),
    lastname:Joi.string().alphanum().min(2).max(20).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age:Joi.number().required(),
    phone:Joi.number().required()
})

let schemaPatient=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    age:Number,
    phone:Number
})

var Patient=mongoose.model('patient',schemaPatient)

var url='mongodb://localhost:27017/medical'

exports.testConnect=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
           mongoose.disconnect()
            resolve('connected !')
        }).catch((err)=>reject(err))
    })
}

exports.postNewPatient= (firstname,lastname,email,age,phone)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
        let validation=  schemaValidation.validate({firstname:firstname,lastname:lastname,email:email,age:age,phone:phone})
           if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)

           }



            let patient=new Patient({
                firstname:firstname,
                lastname:lastname,
                email:email,
                age:age,
                phone:phone


            })

            patient.save().then((doc)=>{
                mongoose.disconnect()
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })

        }).catch((err)=>reject(err))
    })

}

exports.getAllPatients=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
           return Patient.find()     

        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)

        })
    })

}

exports.getOnePatient=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
           return Patient.findById(id)     

        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)

        })
    })

}

exports.deleteOnePatient=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
           return Patient.deleteOne({_id:id})     

        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)

        })
    })

}


exports.updateOnePatient=(id,firstname,lastname,email,age,phone)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
           let validation= schemaValidation.validate({firstname:firstname,lastname:lastname,email:email,age:age,phone:phone})
           if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)

           }


           return Patient.updateOne({_id:id},{firstname:firstname,lastname:lastname,email:email,age:age,phone:phone})     

        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)

        })
    })

}