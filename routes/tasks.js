const { getTasks, createTask, updateTask, deleteTask, getUserTasks } = require('../controllers/tasks/tasks');

const createTasksRoutes = (app) => {
  app.get('/tasks', async (req, res) => {
    const { showDone } = req.query;
    const showDoneBool = showDone === 'true' || showDone === '1';
    const tasks = await getTasks(showDoneBool);
    res.send(tasks);
  });

  app.put('/task', async (req, res) => {
    const task = req.body;
    const result = await createTask(task);
    res.send(result);
  });

  app.patch('/task/:id', async (req, res) => {
    const { id } = req.params;
    const task = req.body;
    const result = await updateTask(id, task);
    res.send(result);
  });

  app.delete('/task/:id', async (req, res) => {
    const { id } = req.params;
    const result = await deleteTask(id);
    res.send(result);
  });

  app.get('/tasks/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const tasks = await getUserTasks(userId);
    res.send(tasks);
  });
};

module.exports = { createTasksRoutes };