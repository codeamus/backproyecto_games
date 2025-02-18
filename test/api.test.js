const request = require('supertest');
const app = require('../server');
const db = require('../db/db');

let server;

beforeAll((done) => {
  server = app.listen(5000, done);
});

afterAll((done) => {
  server.close(done);
});

beforeEach(async () => {
  await db.query('DELETE FROM users');
});

describe('API Consultas', () => {
  test('debería registrar un nuevo usuario y devolver un token JWT', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({ email: 'testUser@example.com', password: 'testPassword123' });
    
    console.log('Cuerpo de la respuesta:', response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('debería autenticar al usuario y devolver un token JWT', async () => {
    await request(app)
      .post('/api/register')
      .send({ email: 'testUser2@example.com', password: 'testPassword123' });
      
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'testUser2@example.com', password: 'testPassword123' });
    
    console.log('Cuerpo de la respuesta (login):', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('debería fallar en autenticar con credenciales incorrectas', async () => {
    await request(app)
      .post('/api/register')
      .send({ email: 'testUser2@example.com', password: 'wrongPassword' });
    
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'testUser2@example.com', password: 'wrongPassword2' });
    
    expect(response.status).toBe(401);
    expect(response.text).toBe('Contraseña incorrecta');
  });

  test('debería rechazar el acceso a una ruta protegida sin token', async () => {
    const response = await request(app)
      .get('/api/protected');
    
    expect(response.status).toBe(401);
  });

  test('debería permitir el acceso a una ruta protegida con token válido', async () => {
    await request(app)
    .post('/api/register')
    .send({ email: 'testUser2@example.com', password: 'testPassword' });
    
    const loginResponse = await request(app)
      .post('/api/login')
      .send({ email: 'testUser2@example.com', password: 'testPassword' });
    
    const token = loginResponse.body.token;
    
    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Ruta protegida, acceso concedido!');
  });
});