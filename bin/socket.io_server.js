const socketIO = require('socket.io');

function setup(server, onSocketEvent) {
    let io = socketIO(server);
    io.on('connection', (socket) => {
        console.log('有一个客户端已连接');

        onSocketEvent(socket);

        // 监听来自客户端的消息事件
        socket.on('message', (message) => {
            console.log('收到来自客户端的消息:', message);

            // 向客户端发送消息
            socket.emit('message', '你好，客户端: ' + message);
        });

        // 监听客户端断开连接事件
        socket.on('disconnect', () => {
            console.log('有一个客户端已断开连接');
        });
    });
}

module.exports = {
    setup
}
