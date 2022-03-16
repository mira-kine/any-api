const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { insert, getById, getAll } = require('../lib/models/Deepsea');
const Deepsea = require('../lib/models/Deepsea');
// persisting data later on

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create deep sea animal', async () => {
    const expected = {
      name: 'Flapjack Octopus',
      diet: 'plankton',
    };
    const res = await request(app).post('/api/v1/deepsea').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('should get all the animals', async () => {
    await insert({
      name: 'Flapjack Octopus',
      diet: 'plankton',
    });
    const res = await request(app).get('/api/v1/deepsea');
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'Flapjack Octopus',
        diet: 'plankton',
      },
    ]);
  });

  it('should get animals by id', async () => {
    const animal = await insert({
      name: 'Flapjack Octopus',
      diet: 'plankton',
    });
    const expected = await Deepsea.getById(1);
    const res = await request(app).get(`/api/v1/deepsea/${animal.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it('should update animal by id', async () => {
    await insert({ name: 'Flapjack Octopus', diet: 'plankton' });
    const expected = {
      id: expect.any(String),
      name: 'Flapjack Octopus',
      diet: 'creatures',
    };
    const res = await request(app)
      .patch('/api/v1/deepsea/1')
      .send({ diet: 'creatures' });
    expect(res.body).toEqual(expected);
  });

  it('should delete animal by id', async () => {
    const animal = await insert({ name: 'Flapjack Octopus', diet: 'plankton' });
    const res = await request(app).delete(`/api/v1/deepsea/${animal.id}`);
    expect(res.body).toEqual(animal);
  });
});
