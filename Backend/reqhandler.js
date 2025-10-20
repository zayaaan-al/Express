import e from 'express';
import dataSchema from './model/model.js'
import userSchema from './model/usermodel.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const {sign}=pkg;

export async function addUser(req,res){
    console.log(req.body);
    const {name,email,pass,cpass}=req.body;
    if(!(name&&email&&pass&&cpass))
        return res.status(500).send({msg:"invalid input"});
    else if(pass!==cpass)
        return res.status(500).send({msg:"passwords do not match"});

    bcrypt.hash(pass,10).then((hpwd)=>{
        console.log(hpwd);
        console.log("data added");
        userSchema.create({name,email,pass:hpwd}).then(()=>{
            res.status(201).send({msg:"User Registered Successfully"})  
        })
        
        
    
}).catch((error)=>{ 
    console.log(error);
    
})
}

export async function login(req,res){
    console.log(req.body);
    const {email,pass}=req.body;

    if(!(email&&pass))
        return res.status(500).send({msg:"fields are empty"});
    const user=await userSchema.findOne({email})

    if(!user)
        return res.status(500).send({msg:"user not found"});
    const success =await bcrypt.compare(pass,user.pass);
    console.log(success);

    if(success!==true)
        return res.status(500).send({msg:"user or password not exist"});

    const token=await sign({userID:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
    res.status(200).send({token})
    

    
    
    
}

export async function AddData(req,res){
    console.log(req.body);
    const {...Datas}=req.body;
    await dataSchema.create({...Datas}).then(()=>{
        res.status(201).send({msg:"Successfull"})
    }).catch((error)=>{
        res.status(404).send({msg:error})
    })
    
}

export async function getdata(req,res){
    console.log("get data");

    const data=await dataSchema.find();
    console.log(data);
    
    res.status(200).send(data);
    
}

export async function updateOne(req,res){
    console.log(req.body);
    const {...Datas}=req.body
    await dataSchema.updateOne({_id:req.params.id},{$set:{...Datas}}).then(()=>{
        res.status(201).send({msg:"Updated"})
    }).catch((error)=>{
        res.status(201).send({error:error})
    })
    
}

export async function getdatabyId(req,res) {
    console.log(" get data by id");
    
    await dataSchema.findOne({_id:req.params.id}).then((data)=>{
        console.log(data);
        
        res.status(201).send({msg:data})
    }).catch((error)=>{
        res.status(201).send({error:error})
    })

    
    
}

export async function deletedata(req,res) {
    const {id}=req.params;
    const data=await dataSchema.deleteOne({_id:id}).then(()=>{
        res.status(200).send({msg:"Deleted"})
    }).catch((error)=>{
        res.status(500).send({error})
    });

}