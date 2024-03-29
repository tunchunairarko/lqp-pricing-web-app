const router = require("express").Router();
const auth = require("../middleware/auth");
const { PythonShell } = require('python-shell');
const path = require('path');
var Barcoder = require('barcoder');
const InventoryItems = require("../models/inventoryModel");
const OutPallets = require("../models/OutPalletModel");
const InPallets = require("../models/InPalletModel");

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

function isAsin(strText) {

    var asinPattern = new RegExp(/^(B[\dA-Z]{9}|\d{9}(X|\d))$/);
    var arrMatches = strText.match(asinPattern);
    // console.log(arrMatches)
    if (arrMatches) {
        if (arrMatches[0] == strText) {
            return true;
        }
    }
    return false;
}

function isUPC(strText) {
    // var validator = new Barcoder('ean13');
    var res = Barcoder.validate(strText)
    return res;
}
// router.post("/deleteproducts", auth, async(req, res) => {
//     // add delete code here
//     try {
//         let { toBeDeleted } = req.body;
//         var inventoryIds = []
//         var ipins = []
//         var opins = []
//         for (var i = 0; i < toBeDeleted.length; i++) {
//             inventoryIds.push(toBeDeleted[i].inventory_id)

//         }
//         const resp = await InventoryItems.deleteMany({ inventory_id: { $in: inventoryIds } })
//         const resp2 = await InPallet.deleteMany({ ipin: { $in: palletNos } })
//         res.json({ resp })
//             //i have to add code for removing from a location

//     } catch (err) {
//         console.log(err)
//     }
// });
router.post("/search", auth, async(req, res) => {
    try {
        let { searchQuery } = req.body;

        searchQuery = escapeStringRegExp(searchQuery)
        let inventoryItems = await InventoryItems.find({ $or: [{ inventory_id: { $regex: searchQuery, $options: "i" } }, { username: { $regex: searchQuery, $options: "i" } }, { location: { $regex: searchQuery, $options: "i" } }, { load_no: { $regex: searchQuery, $options: "i" } }, { retailer: { $regex: searchQuery, $options: "i" } }, { title: { $regex: searchQuery, $options: "i" } }, { ipin: { $regex: searchQuery, $options: "i" } }, { opin: { $regex: searchQuery, $options: "i" } }, { upc: { $regex: searchQuery, $options: "i" } }] }, {}, { sort: { 'created_at': -1 } })
        res.json({ inventoryItems })
    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})
router.post("/new", auth, async(req, res) => {
    try {
        let { username, inventoryItem } = req.body;
        if (!username) {
            username = "admin"
        }
        // console.log(user)
        // console.log(productInp)
        try {
            var DocCounter = await InventoryItems.countDocuments({})
            DocCounter++;
            // console.log(DocCounter)
            const sku = "LID-" + DocCounter.toString().padStart(7, "0");
            inventoryItem.inventory_id = sku
        } catch (err) {
            res.json(err)
        }
        // var productString = JSON.stringify(productInp)
        const newItem = new InventoryItems(inventoryItem)
        const savedNewItem = await newItem.save();

        const update = {
            "$push": {
                "items": inventoryItem.inventory_id
            }
        }
        let doc = await OutPallets.findOneAndUpdate({ opin: inventoryItem.opin }, update)
        let doc2 = await InPallets.findOneAndUpdate({ ipin: inventoryItem.ipin }, update)

        res.json(savedNewItem);
        // let options = {
        //     mode: 'json',
        //     pythonPath: process.env.PYTHON_PATH,
        //     pythonOptions: ['-u'], // get print results in real-time 
        //     scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
        //     args: [productString] //An argument which can be accessed in the script using sys.argv[1] 
        // };
        // PythonShell.run('shopifyUpload.py', options, function (err, result) {
        //     if (err) throw err;

        //     // console.log('result: ', result); 
        //     // res.send(result[0])
        //     // const response = await axios.post(api_url,productDetails)

        //     try {
        //         const resp = result[0]
        //         console.log(resp)
        //         const newProduct = new Products({
        //             shopifyID: resp['product']['id'],
        //             upc: productInp.upc,
        //             sku: productInp.sku,
        //             title: productInp.title,
        //             retail: productInp.retail,
        //             discounted_price: productInp.discounted_price,
        //             image: productInp.image,
        //             description: productInp.description,
        //             condition: productInp.condition,
        //             quantity: productInp.quantity,
        //             categories: [""]
        //         });
        //         const savedProduct = newProduct.save();

        //         const newUserProduct = new UserProducts({
        //             username: username,
        //             posted_products: resp['product']['id']
        //         });

        //         const saveUserProduct = newUserProduct.save();

        //         res.json(resp)
        //     } catch (err) {
        //         dumpError(err)
        //         res.status(500).json({ error: err.message })
        //     }
        // });
    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }



})

router.post("/productlist", auth, async(req, res) => {
    try {

        //at first get the query
        //then check whether it is a upc/asin or a text string with space
        //1. If UPC, then follow one process (Sellerchamp way, if this one works, then no search list should be generated in the front end)
        //2. If text string, then follow another process (Product Data API way)
        const { searchQuery, marketplace } = req.body;
        if (!searchQuery) {
            res.status(400).json({ error: "Missing query data" })
        }
        // console.log(marketplace)
        marketplaceString = JSON.stringify(marketplace)
        var query = searchQuery.toString();
        // console.log(query)
        // console.log("12")

        if (isAsin(query)) {
            // console.log("gaitai")
            // let dir = path.join(__dirname, '../python');
            // console.log(dir);
            // console.log(process.env.PYTHON_PATH);
            queryType = "ASIN"
            let options = {
                mode: 'json',
                pythonPath: process.env.PYTHON_PATH,
                pythonOptions: ['-u'], // get print results in real-time 
                scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
                args: [query, queryType, marketplaceString] //An argument which can be accessed in the script using sys.argv[1] 
            };
            PythonShell.run('apiController.py', options, function(err, result) {
                if (err) {
                    console.log(result)
                    throw err;
                }
                console.log('result: ', result);
                res.send(result[0])
            });

        } else if (isUPC(query)) {
            // let dir = path.join(__dirname, '../python');
            // console.log(dir);
            // console.log(process.env.PYTHON_PATH);
            queryType = "UPC"
            let options = {
                mode: 'json',
                pythonPath: process.env.PYTHON_PATH,
                pythonOptions: ['-u'], // get print results in real-time 
                scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
                args: [query, queryType, marketplaceString] //An argument which can be accessed in the script using sys.argv[1] 
            };
            PythonShell.run('apiController.py', options, function(err, result) {
                if (err) throw err;
                console.log('result: ', result);
                res.send(result[0])
            });
        } else {
            queryType = "KEYWORD"
            let options = {
                mode: 'json',
                pythonPath: process.env.PYTHON_PATH,
                pythonOptions: ['-u'], // get print results in real-time 
                scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
                args: [query, queryType, marketplaceString] //An argument which can be accessed in the script using sys.argv[1] 
            };
            try {
                PythonShell.run('apiController.py', options, function(err, result) {
                    if (err) throw err;
                    console.log('result: ', result);
                    res.send(result[0])
                });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        }
    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
});

router.get("/getlplusid", auth, async(req, res) => {
    try {
        var DocCounter = await InventoryItems.countDocuments({})
        DocCounter++;
        console.log(DocCounter)
        const sku = "LID-" + DocCounter.toString().padStart(7, "0");

        res.json({
            sku: sku
        });
    } catch (err) {
        console.log(err)
        res.json(err)
    }

})

router.get("/getopin/:opin", auth, async(req, res) => {
    const temp = req.params.opin
    const inventoryItems = await InventoryItems.find({ opin: temp }, '-_id inventory_id opin ipin upc title retailer condition cost_price unit_retail quantity discount ext_retail sale_price load_no location image');
    res.json({
        inventoryItems
    });
})
router.get("/", auth, async(req, res) => {
    // const temp = req.params.username
    // const inventoryItems = await InventoryItems.find({username:temp});
    const inventoryItems = await InventoryItems.find({}, {}, { sort: { 'created_at': -1 } });

    res.json({
        inventoryItems
    });
});

module.exports = router;