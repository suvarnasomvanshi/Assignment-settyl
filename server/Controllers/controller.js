import User from "../Model/model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "MyKey";


export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
  
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email }); 
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" }); 
    }
  
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    const hashedPassword = bcrypt.hashSync(password, 8); 
  
    const user = new User({
      name,
      email,
      password: hashedPassword,
  
    });
  
    try {
      await user.save();
      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };






export const login = async(req,res,next)=>{
    const {email,password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email:email})
    }catch(error){
      return new Error(error);
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
        {expiresIn:'60s'}
    )

    if (req.cookies[`${existingUser._id}`]) {
      req.cookies[`${existingUser._id}`] = "";
    }

    res.cookie(
        String(existingUser._id),
        token,
        {
            path:'/',
            expires: new Date(Date.now() + 1000*60),
            httpOnly:true,
            sameSite:'lax',
        }
    )
    return res.status(200).json({message:"succesfully login", user:existingUser,token});
}







export const verifytoken = (req,res,next)=>{

     const cookies = req.headers.cookie;
     const token = cookies.split("=")[1];
     console.log(token)

    
    if(!token){
        res.status(404).json({message:"no token found"});
    }

    jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
        if(err){
         return res.status(400).json({message:'Invalid token'});
        }
        req.id = user.id;
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
    return res.status(200).json({user});
  };




  export const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
        expiresIn: "60s",
      });
      console.log("Regenerated Token\n", token);
  
      res.cookie(String(user.id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60), 
        httpOnly: true,
        sameSite: "lax",
      });
  
      req.id = user.id;
      next();
    });
  };


  export const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
  };

  

export const AdditemList = (req,res,next)=>{
  const {_id,item} = req.body;
  
}


export const auctionItemToSell = (req,res,next)=>{

}

export const auctionItemToBy = (req,res,next)=>{

}

export const Allproduct = (req,res,next)=>{

}
