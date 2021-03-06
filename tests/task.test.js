const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const {
    userOneId,
    userOne,
    userTwo,
    userThree,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .send({
            description: 'new task',
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(201)
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Should fetch user tasks', async() => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    console.log(response.body.length);
    expect(response.body.length).toEqual(2)
});

test('Should not delete other user tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskTwo._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)
});
