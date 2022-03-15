const pool = require('../utils/pool');

module.exports = class Deepsea {
  id;
  name;
  diet;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.diet = row.diet;
  }

  static async insert({ name, diet }) {
    const { rows } = await pool.query(
      `INSERT INTO deepsea(name, diet) VALUES ($1, $2) RETURNING *;`,
      [name, diet]
    );
    const animal = new Deepsea(rows[0]);
    return animal;
  }
};
