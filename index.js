// 引入所需的库

const sequelize = require('./bin/sequelize');
const socketio = require("./bin/socket.io_server");
// const { chatWithGPT } = require("./bin/openai");
const { chatWithOneLineAssistantNoAsync } = require("./bin/chatgpt_axios_api")

const express = require("./bin/express");

let { app, server } = express.setup();

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  chatWithOneLineAssistantNoAsync(message, (response) => {
    res.json({ "chat-response": response });
  }, (error) => {
    res.json({ "chat-error": error });
  });
})

socketio.setup(server, (socket) => {
  socket.on("chat", (message) => {
    chatWithOneLineAssistantNoAsync(message, (response) => {
      socket.emit("chat-response", { response });
    }, (error) => {
      socket.emit("chat-error", { error });
    });
  })
});


// app.post("/chat", async (req, res) => {
//   const { message } = req.body;
//   let response = await chatWithGPT(message);
//   res.json({ response });
// })

// socketio.setup(server, (socket) => {
//   socket.on("chat", async (message) => {
//     let response = await chatWithGPT(message);
//     socket.emit("chat-response", { response });
//   })
// });

const serverConfig = require("./config/server.json");
const PORT = process.env.PORT || serverConfig.port;
const ipAddr = require("./bin/ip_address");
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    ipAddr.forEach(ip => {
      console.log(`Server started on http://${ip}:${PORT}`);
    })
  });
});
