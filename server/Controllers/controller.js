import User from "../Model/model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const signIn = async(req,res,next)=>{
   
    const {name,email,password} = req.body;

    let existingUser;
    try{
         existingUser = await User.findOne({email:email})
    }catch(error){
        console.log(error)
    }

    if(existingUser){
        return res.status(400).json({message: "User already exist.Login insteat of signin"})
    }

    const hasedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password:hasedPassword,
    });

    try{
        await user.save();
    }catch(error){
        console.log(error)
    }
    return res.status(201).json({message:user})
}




export const login = async(req,res,next)=>{
    const {email,password} = req.body;

    let existingUser;

    try{
        existingUser = User.findOne({email:email})
    }catch(err){
        console.log(error)
    }

    if(!existingUser){
        return res.status(400).json({message:"User not exist .Please signin "})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid email /Password"})
    }



    return res.status(200).json({message:"succesfully login", user:existingUser,token});
}


export const itemList = (req,res,next)=>{

}


export const auctionItemToSell = (req,res,next)=>{

}

export const auctionItemToBy = (req,res,next)=>{

}

export const Allproduct = (req,res,next)=>{

}
