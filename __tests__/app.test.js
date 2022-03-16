const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { insert, getById } = require('../lib/models/Deepsea');

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create deep sea animal', async () => {
    const res = await request(app)
      .post('/api/v1/deepsea')
      .send({ name: 'Flapjack Octopus', diet: 'plankton' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Flapjack Octopus',
      diet: 'plankton',
    });
  });

  it('should get all the animals', async () => {
    await insert({ name: 'Flapjack Octopus', diet: 'plankton' });
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
    const animal = await insert({ name: 'Flapjack Octopus', diet: 'plankton' });
    const res = await request(app).get(`/api/v1/deepsea/${animal.id}`);

    expect(res.body).toEqual(animal);
  });

  it('should update animal by id', async () => {
    const animal = await insert({ name: 'Flapjack Octopus', diet: 'plankton' });
    const res = await request(app)
      .patch(`/api/v1/deepsea/${animal.id}`)
      .send({ name: 'Flapjack', diet: 'creatures' });

    const expected = {
      id: expect.any(String),
      name: 'Flapjack',
      diet: 'creatures',
    };
    expect(res.body).toEqual(expected);
    expect(await getById(animal.id)).toEqual(expected);
  });

  it('should delete animal by id', async () => {
    const animal = await insert({ name: 'Flapjack Octopus', diet: 'plankton' });
  });
});
