import express from "express";



const router = express.Router();


router.post("./signin",signIn);
router.post("./login",login);
router.get('./getuser',getuser);
router.post("./itemlist",itemList);
router.post("./auctionitemtosell",auctionItemToSell)


router.get("./auctionitemtobuy",auctionItemToBy)
router.get("./allitemlist",Allproduct)
