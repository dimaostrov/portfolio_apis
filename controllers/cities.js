import city from '../models/cities.model';
import regions from '../models/regions.model';
import logger from '../core/logger/app-logger';
import R from 'ramda';

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const cities = await city.getAll();
        logger.info('sending all cities...');
        res.send(cities);
    }
    catch (err) {
        logger.error('Error in getting cities- ' + err);
        res.send('Got error in getAll');
    }
}

controller.getByCity = async (req, res) => {
    const cityName = req.body.name;
    try {
        const cityInfo = await city.getByCity(cityName);
        res.send(cityInfo);
    }
    catch (err) {
        logger.error('Error in getting cities- ' + err);
        res.send('Got error in getByCity');
    }
}

controller.byRegion = async (req, res) => {
    const regionName = req.body.region;
    try {
        const cities = await city.getByRegion(regionName);
        res.send(cities);
    }
    catch (err) {
        logger.error('Error in getting rerion- ' + err);
        res.send('Got error in byRegion');
    }
}

controller.getCityRegions = async (req, res) => {
    const cityName = req.body.name;
    try {
        const cityInfo = await city.getByCity(cityName);
        const regionsOfCity = cityInfo[0].regions;
        const listings = await regions.returnListings(regionsOfCity);
        res.send(listings);
    }
    catch (err) {
        logger.error('Error in getting city region data- ' + err);
        res.send('Got error in getCityRegions');
    }
}

controller.topZipByCity = async (req, res) => {
    const cityName = req.body.name;
    try {
        const cityInfo = await city.getByCity(cityName);
        const regionsOfCity = cityInfo[0].regions;
        const listings = await regions.returnListings(regionsOfCity);
        // map through each property and get annual revenue, then get the average
        // and then return sorted array with zips
        const zipsWithRevenue = listings.map(region => {
            const { zip, top_listings } = region;
            const earningPotentialArray = top_listings.map(x => {
                const property = x[0].listing;
                const revenue = property.annual_rental_earning_potential;
                return revenue
            })
            const averageRevenue = R.mean(earningPotentialArray);
            return ([zip, averageRevenue]);
        })
        // Here all sorting happens from the unsorted zipsWithRevenue
        const sort = function(a, b) { return b - a };
        const revenuePlace = R.prop(1);
        const sortFunction = R.sortWith([
            R.descend(R.compose(revenuePlace))
        ]);
        res.send(sortFunction(zipsWithRevenue));
    }
    catch (err) {
        logger.error('Error in getting city region data- ' + err);
        res.send('Got error in getCityRegions');
    }
}

controller.getAllCityNames = async (req, res) => {
    const namesData = await city.find({}, {name: 1, _id:0});
    // const names = namesData.map(x => x.name);
    res.send(namesData);

}

export default controller;