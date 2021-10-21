const router = require("express").Router();
const auth = require("../middleware/auth");
const Truckload = require("../models/LoadModel");
const cryptoRandomString = require('crypto-random-string');

escapeStringRegExp.matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

function escapeStringRegExp(str) {
    return str.replace(escapeStringRegExp.matchOperatorsRe, '\\$&');
}


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
router.get("/", auth, async(req, res) => {
    const truckloads = await TruckLoad.find();
    res.json({
        truckloads
    });
});
router.post("/search", auth, async(req, res) => {
    try {
        let { searchQuery } = req.body;

        searchQuery = escapeStringRegExp(searchQuery)

        let truckloads = await Truckload.find({ $or: [{ loadNo: { $regex: searchQuery, $options: "i" } }, { username: { $regex: searchQuery, $options: "i" } }, { retailer: { $regex: searchQuery, $options: "i" } }] })

        res.json({ truckloads })
    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})
router.post("/create", auth, async(req, res) => {
    try {
        let { username, retailer, retailer_short } = req.body;
        if (!username) {
            username = "admin"
        }
        const loadNo = retailer_short + '_' + cryptoRandomString({ length: 8, type: 'distinguishable' });
        const pallets = []

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