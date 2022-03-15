const { Router } = require('express');
const Deepsea = require('../models/Deepsea');

module.exports = Router()
  .post('/', async (req, res) => {
    try {
      const animal = await Deepsea.insert({
        name: req.body.name,
        diet: req.body.diet,
      });
      res.json(animal);
    } catch (error) {
      return null;
    }
  })
  .get('/', async (req, res) => {
    try {
      const animal = await Deepsea.getAll();
      res.json(animal);
    } catch (error) {
      return null;
    }
  });
