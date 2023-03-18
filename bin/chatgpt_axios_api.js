const axios = require('axios');
const { sk, proxy, model } = require("../config/openai.json");


const API_URL = 'https://api.openai.com/v1/chat/completions';
// const API_URL = 'https://api.chatgpt.com/';

// 发送请求
async function chatWithOneLineAssistant(message) {
  var data = JSON.stringify({
    "model": model,
    "messages": [
      {
        "role": "system",
        "content": "你是一个精通汉语及多国语言的全能助手"
      },
      {
        "role": "user",
        "content": message
      }
    ]
  });
  var config = {
    method: 'post',
    url: API_URL,
    headers: {
      'Authorization': `Bearer ${sk}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Android 9; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0'
    },
    data: data,
    proxy
  };
  try {
    const response = await axios(config);
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function chatWithOneLineAssistantNoAsync(message, onResponse, onError) {
  console.log("chatWithOneLineAssistantNoAsync-recv:\n" + message);
  var data = JSON.stringify({
    "model": model,
    "messages": [
      {
        "role": "system",
        "content": "你是一个精通汉语及多国语言的全能助手"
      },
      {
        "role": "user",
        "content": message
      }
    ]
  });
  var config = {
    method: 'post',
    url: API_URL,
    headers: {
      'Authorization': `Bearer ${sk}`,
      'Content-Type': 'application/json',
      // 'origin': 'https://app.uniswap.org'
    },
    data: data,
    proxy
  };
  axios(config).then(completion => {
    const response = completion.data.choices[0].text.trim();
    console.log(completion.data);
    onResponse(response);
  }).catch(onError);
}

module.exports = {
  chatWithOneLineAssistant,
  chatWithOneLineAssistantNoAsync
}

// 调用示例
// sendRequest('Hello, ChatGPT!').then(result => {
//   console.log(result);
// }).catch(error => {
//   console.error(error);
// });
