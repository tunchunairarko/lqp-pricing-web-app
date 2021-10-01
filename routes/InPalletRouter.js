const router = require("express").Router();
const auth = require("../middleware/auth");
const InPallet = require("../models/InPalletModel");
const Truckload = require("../models/LoadModel");
const Location = require("../models/LocationModel");
const cryptoRandomString = require('crypto-random-string');


async function getTotalItemsInALocation(location) {
  try {
    //console.log(location)
    let doc2 = await Location.findOne({ locationNo: location })

    if (doc2) {
      //console.log(doc2)
      const pallets = doc2.pallets
      return pallets.length;
    }
    else {
      return null;
    }
  } catch (err) {
    dumpError(err)
    return null
  }
}

function dumpError(err) {
  if (typeof err === 'object') {
    if (err.message) {
      //console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      //console.log('\nStacktrace:')
      //console.log('====================')
      //console.log(err.stack);
    }
  } else {
    //console.log('dumpError :: argument is not an object');
  }
}
router.get("/", auth, async (req, res) => {
  const ipins = await InPallet.find();
  res.json({
    ipins
  });
});

router.get("/getitem/:ipin", auth, async (req, res) => {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  try{
    const temp = req.params.ipin
  const item = await InPallet.findOne({ ipin: temp });
  res.json({
    item
  });
  }catch(err){
    res.json({err})
  }
});


router.post("/create", auth, async (req, res) => {
  try {
    // //console.log(req.body)

    let { username, load_no, costprice, location } = req.body;
    if (!username) {
      username = "admin"
    }
    const totalLocationItems = getTotalItemsInALocation(location)

    if (totalLocationItems == null || totalLocationItems == 26) {
      res.status(501).json({ error: "Location already full" })
    }
    else {
      const ipin = 'IP' + '_' + cryptoRandomString({ length: 8, type: 'distinguishable' });



      const newPallet = new InPallet({
        ipin,
        username,
        load_no,
        location,
        costprice
      })
      let savedPallet = await newPallet.save();
      const saved_ipin = savedPallet.ipin

      const update = {
        "$addToSet": {
          "pallets": ipin
        }
      }
      let doc = await Truckload.findOneAndUpdate({ loadNo: load_no }, update)
      

      const update2 = {
        "$push": {
          "pallets": {
            "ipin": ipin,
            "loadNo": load_no
          }
        }
      }
      let doc2 = await Location.findOneAndUpdate({ locationNo: location }, update2)
      // //console.log(doc2)
      savedPallet = await InPallet.findOneAndUpdate({ ipin: saved_ipin }, { "$set": { "retailer": doc.retailer } })
      res.json(savedPallet);
    }


  } catch (err) {
    dumpError(err)
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;