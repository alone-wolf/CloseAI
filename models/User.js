const { DataTypes, Model } = require('sequelize');
const sequelize = require("../bin/sequelize");

class User extends Model { }

User.init({
    // 在这里定义模型属性
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'User' // 我们需要选择模型名称
});

module.exports = User;
