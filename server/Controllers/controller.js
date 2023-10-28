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
    }catch(error){
        console.log(error)
    }

    if(!existingUser){
        return res.status(400).json({message:"User not exist .Please signin "})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid email /Password"})
    }
    
    const token = jwt.sign(
        {id: existingUser._id},
        JWT_SECRET_KEY,
        {expiresIn:'30s'}
    )

    res.cookie(
        String(existingUser._id),
        token,
        {
            path:'/',
            expires: new Date(Date.now() + 1000*30),
            httpOnly:true,
            sameSite:'lax',
        }
    )
    return res.status(200).json({message:"succesfully login", user:existingUser,token});
}


export const verifytoken = (req,res,next)=>{

    const cookies = req.headers.cookie;
    const token = cookies.split('=')[1];
    console.log(token);

    if(!token){
        res.status(404).json({message:"no token found"});
    }

    jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(400).json({message:'Invalid token'});
        }
        console.log(user.id);
    });

    next();

}


export const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
      user = await User.findById(userId, "-password");
    } catch (err) {
      return new Error(err);
    }
    if (!user) {
      return res.status(404).json({ message: "User not find" });
    }
    return res.status(200).json({ user });
  };





  

export const itemList = (req,res,next)=>{

}


export const auctionItemToSell = (req,res,next)=>{

}

export const auctionItemToBy = (req,res,next)=>{

}

export const Allproduct = (req,res,next)=>{

}
