import express from "express";
import { signUp,login,getUser,verifytoken,refreshToken,logout,AdditemList,Allproduct,auctionItem,AllauctionItem} from "../Controllers/controller";


const router = express.Router();


router.post("/signup",signUp);
router.post("/login",login);
router.get("/user",verifytoken,getUser)
router.get("/refresh", refreshToken, verifytoken, getUser);
router.post("/logout", verifytoken, logout);

router.post("/additem",AdditemList);
router.get("/allitemlist",Allproduct);


router.post("/auctionitem",auctionItem)
router.get("/allauctionitem",AllauctionItem)




export default router;