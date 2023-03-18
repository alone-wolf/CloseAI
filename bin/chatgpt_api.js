const https = require('https');

const API_KEY = 'your_api_key';
const API_URL = 'https://api.openai.com/v1/';

function generateText(prompt) {
    const data = JSON.stringify({
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        }
    };

    const req = https.request(options, res => {
        let body = '';
        res.on('data', chunk => {
            body += chunk;
        });
        res.on('end', () => {
            const response = JSON.parse(body);
            console.log(response.choices[0].text);
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

generateText('Hello, how are you today?');
