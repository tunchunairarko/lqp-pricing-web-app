const router = require("express").Router();
const auth = require("../middleware/auth");
const Catalog = require("../models/CatalogModel");

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
    const catalogs = await Catalog.find();
    res.json({
       catalogs
    });
});
router.post("/create", auth,  async (req, res) => {
    try {
        let { username, catalog } = req.body;
        if(!username){
            username="admin"
        }
        
        
        const newcatalog = new Catalog({
            catalog,
            username,
            
        })
        const savedcatalog = await newcatalog.save();
        res.json(savedcatalog);

    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;