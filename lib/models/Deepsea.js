const pool = require('../utils/pool');
// Create - add
// Read - get all, getbyId
// Update - updatebyId
// Delete - deleteByID
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

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM deepsea
      `
    );
    return rows.map((row) => new Deepsea(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM deepsea
      WHERE id=$1
      `,
      [id]
    );
    return new Deepsea(rows[0]);
  }

  static async updateById(id, { name, diet }) {
    const { rows } = await pool.query(
      `
      UPDATE deepsea
      SET name=$2, diet=$3
      WHERE id=$1
      RETURNING *;
      `,
      [id, name, diet]
    );
    return new Deepsea(rows[0]);
  }
};
