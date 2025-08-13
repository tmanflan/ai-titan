const axios = require('axios');

async function callDeepSeek(prompt) {
  const apiKey = process.env.DeepSeek;
  if (!apiKey) throw new Error('DeepSeek API key not set');

  try {
    // If DeepSeek API is not available, provide a fallback response
    if (apiKey === 'your_deepseek_api_key_here' || apiKey === 'demo_mode') {
      console.log('Using demo mode for DeepSeek API');
      return generateFallbackResponse(prompt);
    }

    // Actual DeepSeek API call
    const url = 'https://api.deepseek.com/v1/generate';
    const payload = {
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
    };

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.error('DeepSeek API error:', error.message);
    // Fallback to demo mode if API call fails
    return generateFallbackResponse(prompt);
  }
}

// Fallback function for demo purposes
function generateFallbackResponse(prompt) {
  // Simple template-based response for demo purposes
  if (prompt.toLowerCase().includes('button')) {
    return {
      generated_text: `import React from 'react';

function App() {
  return (
    <div className="container">
      <button className="primary-button">Click Me</button>
    </div>
  );
}

export default App;`
    };
  } else if (prompt.toLowerCase().includes('form')) {
    return {
      generated_text: `import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;`
    };
  } else {
    return {
      generated_text: `import React from 'react';

function App() {
  return (
    <div>
      <h1>Generated App</h1>
      <p>This is a simple app based on your description.</p>
    </div>
  );
}

export default App;`
    };
  }
}

module.exports = { callDeepSeek };
