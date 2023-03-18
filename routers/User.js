const express = require('express');
const models = require("../models/index");
let usersRouter = express.Router();


// Define routes
usersRouter.get('/', async (req, res) => {
    const users = await models.User.findAll();
    res.json(users);
});

usersRouter.post('/', async (req, res) => {
    const { name, email } = req.body;
    const user = await models.User.create({ name, email });
    res.json(user);
});

usersRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await models.User.findOne({ where: { id } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    user.email = email;
    await user.save();
    res.json(user);
});

usersRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await models.User.findOne({ where: { id } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted' });
});

module.exports = {
    // router: usersRouter,
    register: (app) => {
        app.use("/users", usersRouter)
    }
}

// 这个代码示例定义了四个路由：

// - GET `/users`：获取所有用户
// - POST `/users`：创建一个用户
// - PUT `/users/:id`：更新一个用户
// - DELETE `/users/:id`：删除一个用户
