const router = require("express").Router();
const auth = require("../middleware/auth");
const Location = require("../models/LocationModel");
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
  const locations = await Location.find();
  res.json({
      locations
  });
});  
router.post("/create", auth,  async (req, res) => {
    try {
        let { username, prefix, suffix } = req.body;
        if(!username){
            username="admin"
        }
        const locationNo=prefix+'-'+suffix;
        
        const newLocation = new Location({
            locationNo,
            username
        })
        const savedLocation = await newLocation.save();
        res.json(savedLocation);

    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})



module.exports = router;