const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware para parsear JSON
app.use(express.json());

// Array para almacenar todas las tareas
let tasks = [];

// Ruta para obtener todas las tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Ruta para crear una nueva tarea
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Ruta para marcar una tarea como completada
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.completed = true;
    res.json(task);
});


/*app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/

module.exports = app;