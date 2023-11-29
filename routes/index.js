const router = require("express").Router();
const bootstrapTables = require('../bootstraper/bootstrapTable');
const populateTax = require('../bootstraper/addTaxSlabs')

const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.get("/bootstrap/taxSlabs", populateTax);
router.use("/bootstrap", bootstrapTables);
router.get("/ping", (req,res)=>{
    res.status(200).json({"res":"pong"});
});

module.exports=router