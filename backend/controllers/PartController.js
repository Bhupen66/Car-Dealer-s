const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware'); // Authentication middleware
const Part = require('../models/Part'); // Import the Part model

// Example: Add a new part (POST /parts)
router.post('/parts', checkAuth, async (req, res) => {
    const { partNumber, image, details } = req.body;

    try {
        const newPart = new Part({
            partNumber,
            image,
            details,
        });

        // Insert part into database
        const savedPart = await newPart.save();
        res.status(201).json(savedPart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add part' });
    }
});

// Example: Update a part (PUT /parts/:id)
router.put('/parts/:id', checkAuth, async (req, res) => {
    const { id } = req.params;
    const updatedPartData = req.body;

    try {
        // Update part in the database
        const updatedPart = await Part.findByIdAndUpdate(id, updatedPartData, { new: true, runValidators: true });

        if (updatedPart) {
            res.json(updatedPart);
        } else {
            res.status(404).json({ error: 'Part not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update part' });
    }
});

// Example: Delete a part (DELETE /parts/:id)
router.delete('/parts/:id', checkAuth, async (req, res) => {
    const { id } = req.params;

    try {
        // Delete part from database
        const deletedPart = await Part.findByIdAndDelete(id);

        if (deletedPart) {
            res.json({ message: 'Part deleted' });
        } else {
            res.status(404).json({ error: 'Part not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete part' });
    }
});

// Example: Fetch all parts (GET /parts)
router.get('/parts', checkAuth, async (req, res) => {
    try {
        // Retrieve parts from the database
        const parts = await Part.find();
        res.json(parts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch parts' });
    }
});

// Example: Get a part by ID (GET /parts/:id)
router.get('/parts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const part = await Part.findById(id);
        if (part) {
            res.json(part);
        } else {
            res.status(404).json({ error: 'Part not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch part' });
    }
});

module.exports = router;