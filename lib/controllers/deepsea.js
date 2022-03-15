const { Router } = require('express');
const pool = require('../utils/pool');
const Deepsea = require('../models/Deepsea');

module.exports = Router().post('/', async (req, res) => {
  await pool.query(
    `INSERT INTO deepsea(name, diet) VALUES ($1, $2) RETURNING *;`,
    [req.body.name, req.body.diet]
  );
  //   const animal = new Deepsea(rows[0]);
  const animal = { id: '1', name: 'Flapjack Octopus', diet: 'plankton' };
  res.send(animal);
});
