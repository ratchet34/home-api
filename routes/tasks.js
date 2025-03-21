const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks/tasks');

const createTasksRoutes = (app) => {
  app.get('/tasks', async (req, res) => {
    const tasks = await getTasks();
    res.send(tasks);
  });

  app.put('/task', async (req, res) => {
    const { task } = req.body;
    const result = await createTask(task);
    res.send(result);
  });

  app.patch('/task/:id', async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    const result = await updateTask(id, task);
    res.send(result);
  });

  app.delete('/task/:id', async (req, res) => {
    const { id } = req.params;
    const result = await deleteTask(id);
    res.send(result);
  });
};

module.exports = { createTasksRoutes };