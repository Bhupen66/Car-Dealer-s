const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware'); // Authentication middleware
const { dbConnection } = require('../database'); // Your database connection
const Car = require('../models/Car');

// Example: Add a new car (POST /cars)
router.post('/cars', checkAuth, async (req, res) => {
    const { model, image, price, company, features, moreDetails } = req.body;

    try {
        const newCar = {
            model,
            image,
            price,
            company,
            features,
            moreDetails,
        };

        // Insert car into database
        const car = await dbConnection.collection('cars').insertOne(newCar);
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add car' });
    }
});

// Example: Update a car (PUT /cars/:id)
router.put('/cars/:id', checkAuth, async (req, res) => {
    const { id } = req.params;
    const updatedCar = req.body;

    try {
        // Update car in the database
        const result = await dbConnection.collection('cars').updateOne({ _id: id }, { $set: updatedCar });

        if (result.modifiedCount > 0) {
            res.json(updatedCar);
        } else {
            res.status(404).json({ error: 'Car not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update car' });
    }
});

// Example: Delete a car (DELETE /cars/:id)
router.delete('/cars/:id', checkAuth, async (req, res) => {
    const { id } = req.params;

    try {
        // Delete car from database
        const result = await dbConnection.collection('cars').deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({ message: 'Car deleted' });
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete car' });
    }
});

// Example: Fetch all cars (GET /cars)
router.get('/cars', checkAuth, async (req, res) => {
    try {
        // Retrieve cars from the database
        const cars = await dbConnection.collection('cars').find().toArray();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
});

// Example: Get all cars (GET /api/cars)
router.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Example: Create a new car (POST /api/cars)
router.post('/api/cars', async (req, res) => {
    try {
        const car = new Car(req.body);
        const newCar = await car.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Example: Update a car (PUT /api/cars/:id)
router.put('/api/cars/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Example: Delete a car (DELETE /api/cars/:id)
router.delete('/api/cars/:id', async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;