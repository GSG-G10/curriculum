const router = require('./router');
const supertest = require('supertest');

test('Initialise', () => {
  let num = 2;
  expect(num).toBe(2);
})

test('Home route', (done) => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.text).toBe('Hello');
      done();
    });
});