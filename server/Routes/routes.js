import express from "express";
import { signUp,login,getUser,verifytoken,refreshToken,logout} from "../Controllers/controller";


const router = express.Router();


router.post("/signup",signUp);
router.post("/login",login);
router.get("/user",verifytoken,getUser)
router.get("/refresh", refreshToken, verifytoken, getUser);
router.post("/logout", verifytoken, logout);



// router.post("./itemlist",itemList);
// router.post("./auctionitemtosell",auctionItemToSell)


// router.get("./auctionitemtobuy",auctionItemToBy)
// router.get("./allitemlist",Allproduct)



export default router;