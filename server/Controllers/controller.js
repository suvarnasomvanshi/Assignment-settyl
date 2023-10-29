import User from "../Model/model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
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

  

export const AdditemList = async(req,res,next)=>{
  const {_id,item} = req.body;
  
  let existingUser;
  try{
    existingUser = await User.findById({_id})
  }catch(err){
    return new err
  }

  if(!_id){
    return res.status(400).json({message: "anable to add, user not found"})
  }

  const newItem = {
    name:item.name,
    quantity:item.quantity,
    price:item.price,
    image:item.image,
  }

  existingUser.itemList.push(newItem);
  try{
    await existingUser.save();
  }catch(err){
    return res.status(500).json({message:'error occur during adding item'})
  }

  res.status(201).json({message:"Item added successfully"})

}



export const Allproduct = async(req,res,next)=>{
     
  try{
    const allUsers = await User.find({});

    if(!allUsers){
      return res.status(404).json({message:'No user exist'})
    }

    let allproduct=[];

    allUsers.forEach((user)=>{
      if(user.itemList && user.itemList.length>0){
        allproduct = allproduct.concat(user.itemList);
      }
    })

    if(allproduct.length ===0){
      return res.status(404).json({message:'No prouct available'})
    }

    res.status(201).json(allproduct);

  }catch(err){
    res.status(500).json({ message: "Error fetching products" });
  }

}



// itemId is itemList[{object id}]
export const auctionItem = async(req,res,next)=>{
  
  const {_id,itemId} = req.body; 

  let existingUser;
    try {
        existingUser = await User.findById(_id);
    } catch (err) {
        return res.status(500).json({ message: "Error finding user" });
    }

    if (!existingUser) {
        return res.status(400).json({ message: "User not found" });
    }
    

    let foundItem = false;

  // Loop through the itemList array and find the item with the matching _id
  for (let i = 0; i < existingUser.itemList.length; i++) {
    const item = existingUser.itemList[i];
    if (item._id.equals(itemId)) {
      if (item.isAuctioned) {
        return res.status(400).json({ message: 'Item is already in auction' });
      }
      item.isAuctioned = true;
      foundItem = true;
      break;
    }
  }

  if (!foundItem) {
    return res.status(400).json({ message: 'Item not found in itemList' });
  }

    try {
      await existingUser.save();
      return res.status(200).json({ message: "Item added to auction successfully" });
  } catch (err) {
      return res.status(500).json({ message: "Error adding item to auction" });
  }
}


export const AllauctionItem = async (req, res, next) => {
  try {
    const allUsers = await User.find({});

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: 'No users or items found' });
    }

    let auctionedItemsWithUserDetails = [];

    allUsers.forEach((user) => {
      if (user.itemList && user.itemList.length > 0) {
        const auctionedItems = user.itemList.filter(item => item.isAuctioned === true);
        if (auctionedItems.length > 0) {
          auctionedItems.forEach((item) => {
            const itemWithUserDetails = {
              userId: user._id, // User ID
              itemId: item._id, // Item ID

            };
            auctionedItemsWithUserDetails.push(itemWithUserDetails);
          });
        }
      }
    });

    if (auctionedItemsWithUserDetails.length === 0) {
      return res.status(404).json({ message: 'No auctioned items available' });
    }

    res.status(200).json(auctionedItemsWithUserDetails);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching auctioned items' });
  }
};


