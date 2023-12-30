const router = require("express").Router();
const controller =require("../controller/projectController");
const verifyToken = require("./verifyToken");



//Api
//router.post('/add',verify,controller.create);

router.post('/add',controller.create);
//router.get('/find',verifyToken,controller.find);
router.get('/find',controller.find);

router.put('/update/:id',controller.update);
router.put('/propose/:id',controller.propose);
router.put('/uploadWork/:id',controller.uploadWork);
router.put('/confirmWork/:id',controller.confirmWork);


router.delete('/delete/:id',controller.delete);



module.exports=router;