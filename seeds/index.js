const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { descriptors, places } = require('./seedHelpers');
const cities = require('./cities');


mongoose.connect('mongodb://localhost:27017/yelp-camp2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database Connected!');
    })
    .catch((err) => {
        console.log('Oh NO, Mongo Connection Error!');
        console.log(err);
    });

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        });
        await camp.save();
    }
};

seedDB().then(() => mongoose.connection.close());