const router = require("express").Router();
const auth = require("../middleware/auth");
const OutPallet = require("../models/OutPalletModel");
const InPallet = require("../models/InPalletModel");
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
  const opins = await OutPallet.find();
  res.json({
    opins
  });
});

router.get("/getitem/:opin", auth, async (req, res) => {
    // Access userId via: req.params.userId
    // Access bookId via: req.params.bookId
    const temp = req.params.opin 
    const item = await OutPallet.findOne({opin:temp});
    res.json({
      item
    });
  });

router.post("/create", auth, async (req, res) => {
  try {
    // //console.log(req.body)

    let { username, catalog, ipin } = req.body;
    if (!username) {
      username = "admin"
    }
    
    else {
      const opin = 'OP' + '_' + cryptoRandomString({ length: 8, type: 'distinguishable' });

      const newPallet = new OutPallet({
        opin,
        username,
        catalog,
        ipin
      })
      let savedPallet = await newPallet.save();
      const saved_opin = savedPallet.opin

    //   const update = {
    //     "$addToSet": {
    //       "pallets": opin
    //     }
    //   }
    //   let doc = await Truckload.findOneAndUpdate({ loadNo: load_no }, update)

    //   const update2 = {
    //     "$push": {
    //       "pallets": {
    //         "ipin": ipin,
    //         "loadNo": load_no
    //       }
    //     }
    //   }
    //   let doc2 = await Location.findOneAndUpdate({ locationNo: location }, update2)
    //   // //console.log(doc2)
    //   savedPallet = await OutPallet.findOneAndUpdate({ ipin: saved_ipin }, { "$set": { "retailer": doc.retailer } })
        console.log(saved_opin)
        res.json(saved_opin);
    }


  } catch (err) {
    dumpError(err)
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;