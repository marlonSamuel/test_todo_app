const request = require('supertest');
const express = require('express');

const app = require('../server'); // Asegúrate de exportar la app en server.js

describe('Tasks API', () => {
    it('should create a new task', async() => {
        const res = await request(app)
            .post('/tasks')
            .send({ title: 'Test Task' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test Task');
    });

    it('should return all tasks', async() => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should mark a task as completed', async() => {
        const res = await request(app)
            .post('/tasks')
            .send({ title: 'Task to complete' });
        const taskId = res.body.id;

        const completeRes = await request(app).put(`/tasks/${taskId}`);
        expect(completeRes.statusCode).toEqual(200);
        expect(completeRes.body.completed).toBe(true);
    });
});