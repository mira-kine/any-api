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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const animal = await Deepsea.getById(req.params.id);
      res.send(animal);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res) => {
    const animal = await Deepsea.updateById(req.params.id, req.body);
    res.send(animal);
  })
  .delete('/:id', async (req, res) => {
    const animal = await Deepsea.deleteById(req.params.id);
    res.send(animal);
  });
