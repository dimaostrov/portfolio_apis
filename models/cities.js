import mongoose from 'mongoose';

const citieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  occupancy_ltm: {
    type: Number,
    required: true,
  },
  city_id: {
    type: Number,
    required: true,
    unique: true,
  },
  num_total_listings: {
    type: Number,
    required: true,
  },
  num_active_listings: {
    type: Number,
    required: true,
  },
  boundary: {
    type: Object,
  },
  annual_revenue_potential: {
    type: Object
  },
  regions: [{
    type: Number, unique: true
  }],
  top_properties: [
    {
      type: Object, unique: true
    }
  ]

},
  { collection: 'city' });

const citiesModel = mongoose.model('city', citieSchema);

citiesModel.getAll = () => {
  return citiesModel.find({});
}

citiesModel.getByCity = (cityName) => {
  return citiesModel.find({ name: cityName });
}

citiesModel.getByRegion = async (region) => {
  switch (region) {
    case 'west':
      return citiesModel.find({ 'boundary.coordinates.0': { $lt: -114 } })
      break;
    case 'east':
      return citiesModel.find({
        $and:
          [
            { 'boundary.coordinates.0': { $gt: -84 } },
            { 'boundary.coordinates.1': { $gt: 24 } }
          ]
      })
      break;
    case 'midwest':
      return citiesModel.find({
        $and:
          [
            { 'boundary.coordinates.0': { $gt: -114 } },
            { 'boundary.coordinates.0': { $lt: -94 } }
          ]
      })
      break;
    case 'mideast':
      return citiesModel.find({
        $and:
          [
            { 'boundary.coordinates.0': { $lt: -84 } },
            { 'boundary.coordinates.0': { $gt: -94 } },
            { 'boundary.coordinates.1': { $gt: 19 } },
          ]
      })
      break;
    case 'puertorico':
      return citiesModel.find({ 'boundary.coordinates.1': { $lt: 19 } })
      break;
    default:
      break;
  }
}

export default citiesModel;