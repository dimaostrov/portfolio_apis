import mongoose from 'mongoose';

const regionSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  zip: {
    type: String,
  },
  top_listings: [
    {
      type: Array
    }
  ]

},
  { collection: 'region' });

const regionsModel = mongoose.model('region', regionSchema);

regionsModel.returnListings = async (arrayOfIDs) => {
  const listings = regionsModel.find(
    {
      id: {
        $in: arrayOfIDs
      }
    }, function (err, docs) {
      if (err) throw err
      return docs;
    }
  )  
  return listings;
}

export default regionsModel;