const router = require("express").Router();
const auth = require("../middleware/auth");
const Truckload = require("../models/LoadModel");
const cryptoRandomString = require('crypto-random-string');

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
  const truckloads = await TruckLoad.find();
  res.json({
      truckloads
  });
});  
router.post("/create", auth,  async (req, res) => {
    try {
        let { username, retailer, retailer_short } = req.body;
        if(!username){
            username="admin"
        }
        const loadNo=retailer_short+'_'+cryptoRandomString({length: 8, type: 'distinguishable'});
        const pallets=[]
        
        const newLoad = new TruckLoad({
            loadNo,
            retailer,
            username,
            pallets
        })
        const savedTruckLoad = await newLoad.save();
        res.json(savedTruckLoad);

    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;