const express = require('express');
const router = express.Router();
const Part = require('../model/Parts'); // Adjust the path if necessary

// Middleware to handle errors
const handleErrors = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'An error occurred' });
};

// Create a new part
router.post('/', async (req, res) => {
  const { partNumber, image, details } = req.body;

  const newPart = new Part({
    partNumber,
    image,
    details,
  });

  try {
    const savedPart = await newPart.save();
    res.status(201).json(savedPart);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Get all parts
router.get('/', async (req, res) => {
  try {
    const parts = await Part.find();
    res.status(200).json(parts);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Get a part by ID
router.get('/:id', async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ error: 'Part not found' });
    }
    res.status(200).json(part);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Update a part by ID
router.put('/:id', async (req, res) => {
  const { partNumber, image, details } = req.body;

  try {
    const updatedPart = await Part.findByIdAndUpdate(
      req.params.id,
      { partNumber, image, details },
      { new: true, runValidators: true }
    );

    if (!updatedPart) {
      return res.status(404).json({ error: 'Part not found' });
    }

    res.status(200).json(updatedPart);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Delete a part by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPart = await Part.findByIdAndDelete(req.params.id);
    if (!deletedPart) {
      return res.status(404).json({ error: 'Part not found' });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    handleErrors(res, error);
  }
});

module.exports = router;
