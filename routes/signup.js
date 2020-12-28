const express = require('express')
const router = express.Router()
const knex = require('../helper/knex')
const Joi = require('joi');
router.post('/signup',async(req,res)=>{
    const schema = Joi.object({
       
        name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        email: Joi.string()
       
        .min(3)
        .max(30)
        .required(),

        mo_no:Joi.number().integer().required(),

        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    const data= {
        
        name:req.body.name,
        email:req.body.email,
        mo_no:req.body.mo_no,
        password:req.body.password
    }
    try{
        const value = await schema.validateAsync(data);
        const userexist= await knex('register').select('name').where('email',data.email)
        if(userexist.length>=1 ){
            throw new Error('User alredy exist')
        }
        const result= await knex('register').insert(data)
        
        console.log(result)
        res.status(200).json({
            meta:{ 
                status:1,
                message:`success`
            }
        })
    }
    catch(error){ 
        console.log(error)
        res.status(401).json({
            meta:{ 
                status:0,
                message:`${error}`
            }
        })
    }
 

  
})

module.exports=router;