// test-deepseek.js
// Usage: node test-deepseek.js
const axios = require('axios');

async function test() {
  try {
    const response = await axios.post('http://localhost:4000/deepseek', {
      prompt: 'Generate a React button component',
    });
    console.log('DeepSeek API response:', response.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

test();
