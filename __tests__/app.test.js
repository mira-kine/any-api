const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
