const axios = require("axios");
const { proxy } = require("../config/openai.json");

let config = {
    method: 'get',
    url: "https://google.com",
    // data: data,
    proxy
};

axios(config).then(r => {
    console.log("ok:!!");
}).catch(e => {
    console.log("error:", e);
});


