import express from "express";
import { signUp,login,getUser,verifytoken} from "../Controllers/controller";


const router = express.Router();


router.post("/signup",signUp);
router.post("/login",login);
router.get("/user",verifytoken,getUser)
//verifytoken


// router.post("./itemlist",itemList);
// router.post("./auctionitemtosell",auctionItemToSell)


// router.get("./auctionitemtobuy",auctionItemToBy)
// router.get("./allitemlist",Allproduct)



export default router;