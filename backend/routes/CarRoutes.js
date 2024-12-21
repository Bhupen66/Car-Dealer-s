const express = require('express');
const router = express.Router();
const Car = require('../model/Car'); // Assuming your model is in the 'models' folder

// @route POST /api/cars
// @desc Add a new car
router.post('/', async (req, res) => {
    try {
        const { model, image, price, company, features, moreDetails } = req.body;

        // Validate required fields
        if (!model || !image || !price || !company || !features || !moreDetails) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const car = new Car({ model, image, price, company, features, moreDetails });
        await car.save();
        res.status(201).json(car); // Send back the saved car data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/cars
// @desc Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars); // Send back the list of all cars
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/cars/:id
// @desc Get a specific car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car); // Send back the car data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route PUT /api/cars/:id
// @desc Update a car by ID
router.put('/:id', async (req, res) => {
    try {
        const { model, image, price, company, features, moreDetails } = req.body;

        // Find the car and update it
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            { model, image, price, company, features, moreDetails },
            { new: true } // This option returns the updated document
        );

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json(car); // Send back the updated car data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route DELETE /api/cars/:id
// @desc Delete a car by ID
router.delete('/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;















