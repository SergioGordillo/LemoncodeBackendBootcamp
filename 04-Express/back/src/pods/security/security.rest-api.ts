import { Router } from "express";

export const securityAPI = Router(); 

securityAPI.post('login', async(req, res, next)=>{
    try{
     const {email, password} = req.body;
     //Check if the email and password are OK
     //Create JWT Token
     //Send token as a response for the request of login
    }catch(error){
      next(error);
    }

}); 