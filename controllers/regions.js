const regions = require('../models/regions')
const controller = {};

controller.getPropertiesFromRegions = async (req, res) => {
  let regionIDs = req.body.regions;
  try{
      const listings = await regions.returnListings(regionIDs);
      res.send(listings);
  }
  catch(err) {
      logger.error('Failed to get listings- ' + err);
      res.send('Failed to get listings by those IDs!');
  }
}

module.exports = controller;


