const router = require("express").Router();
const auth = require("../middleware/auth");
const Retailer = require("../models/RetailerModel");

function dumpError(err) {
    if (typeof err === 'object') {
      if (err.message) {
        console.log('\nMessage: ' + err.message)
      }
      if (err.stack) {
        console.log('\nStacktrace:')
        console.log('====================')
        console.log(err.stack);
      }
    } else {
      console.log('dumpError :: argument is not an object');
    }
  }
router.get("/", auth, async (req, res) => {
    const retailers = await Retailer.find();
    res.json({
       retailers
    });
});
router.post("/create", auth,  async (req, res) => {
    try {
        let { username, retailer } = req.body;
        if(!username){
            username="admin"
        }
        
        
        const newRetailer = new Retailer({
            retailer,
            username,
            
        })
        const savedRetailer = await newRetailer.save();
        res.json(savedRetailer);

    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;