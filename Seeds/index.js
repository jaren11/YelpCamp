const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30 + 10)
        const camp = new Campground({
            author: `628483e417141ff5a9ca5d89`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. At earum id distinctio, expedita nostrum amet dolorem voluptas quisquam ipsam perspiciatis dicta, totam sit accusantium similique ut, odio reprehenderit blanditiis nulla.`,
            price: price,
            geometry: {
                type: `Point`,
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: `https://res.cloudinary.com/dizojo2qa/image/upload/v1652859884/YelpCamp/v1j3mrgvcdczxeeevt7z.jpg`,
                    filename: `YelpCamp/v1j3mrgvcdczxeeevt7z`
                },
                {
                    url: `https://res.cloudinary.com/dizojo2qa/image/upload/v1652860976/YelpCamp/n8l1mmwmr4vltjhtukcm.jpg`,
                    filename: `YelpCamp/n8l1mmwmr4vltjhtukcm`
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})