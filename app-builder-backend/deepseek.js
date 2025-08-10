const axios = require('axios');

async function callDeepSeek(prompt) {
  const apiKey = process.env.DeepSeek;
  if (!apiKey) throw new Error('DeepSeek API key not set');

  // Example DeepSeek API endpoint and payload (replace with actual API details)
  const url = 'https://api.deepseek.com/v1/generate';
  const payload = {
    prompt,
    // ...other params as needed
  };

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const response = await axios.post(url, payload, { headers });
  return response.data;
}

module.exports = { callDeepSeek };
