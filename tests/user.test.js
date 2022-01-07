const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {userOneId, userOne, setupDatabase } = require('./fixtures/db');


beforeEach(setupDatabase);

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!',
    }).expect(201)
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password,
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[0].token);
});

test('Should not login existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'sdsd@sdsd.com',
        password: userOne.password,
    }).expect(400);
});

test('Should get the auth user profile', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get the unauthenticated user', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401);
});

test('Should delete get the authenticated user', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar/')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.png')
        .expect(200);

        const user = await User.findById(userOneId);
        expect(user.avatar).toEqual(expect.any(Buffer));
})

