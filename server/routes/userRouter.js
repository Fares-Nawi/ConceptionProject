const router = require("express").Router();
const controller =require("../controller/userController");
const verifyToken = require("./verifyToken");



//Api
//router.post('/add',verify,controller.create);

router.post('/add',controller.create);
//router.get('/find',verifyToken,controller.find);
router.get('/find',controller.find);

router.get('/sendMail',controller.sendMail);

router.put('/update/:id',controller.update);
router.delete('/delete/:id',controller.delete);



module.exports=router;