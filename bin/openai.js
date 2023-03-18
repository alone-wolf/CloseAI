const { Configuration, OpenAIApi } = require('openai');
const { sk, proxy, model } = require("../config/openai.json");

const configuration = new Configuration({
    apiKey: sk,
});
const openai = new OpenAIApi(configuration);

// async function chatWithGPT(message) {
//     console.log("recv: " + message);
//     const completion = await openai.createCompletion({
//         model: "babbage",
//         prompt: message,
//         temperature: 0.6,
//         max_tokens: 1000
//     }, {
//         proxy
//     });
//     const response = completion.data.choices[0].text.trim();
//     console.log(completion.data);
//     return response;
// }

function chatWithGPT(message, onResponse, onError) {
    console.log("recv: " + message);
    openai.createChatCompletion({
        model: model,
        prompt: message,
        temperature: 0.6,
        max_tokens: 1000
    }, {
        proxy
    }).then(completion => {
        const response = completion.data.choices[0].text.trim();
        console.log(completion.data);
        onResponse(response);
    }).catch(onError);
}


module.exports = { openai, chatWithGPT }
