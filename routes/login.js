const express = require('express')
const router = express.Router()
const knex = require('../helper/knex')
const Joi = require('joi');
router.patch('/signin',async(req,res)=>{

    const data1= {
        
        
        email:req.body.email,
        password:req.body.password
    }
    try {
        const userexist1= await knex('register').select('name').where('email',data1.email).andWhere('password',data1.password)
        // const userexist2= await knex('register').select('name').where('password',data1.password)
        console.log(userexist1)
        if(userexist1.length==0 ){
            throw new Error('User not exist')   
        }
        
        return res.status(200).json({
            meta: {
                status: '1',
                message: userexist1
            },
            data: {

            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            meta: {
                status: '0',
                message:error
            },
            data: {

            }
        })
        
    }

   
})  
module.exports=router;
