const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { insert } = require('../lib/models/Deepsea');

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
});
