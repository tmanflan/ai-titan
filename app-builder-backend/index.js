require('dotenv').config();
const path = require('path');
if (!process.env.DeepSeek) {
  try {
    require('dotenv').config({ path: path.resolve(__dirname, '../Secrets.env') });
  } catch (e) {
    // ignore
  }
}
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { callDeepSeek } = require('./deepseek');
const { img2code } = require('./img2code_integration');
const { createAppWithAgent } = require('./agent');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// POST /image-to-code: Accepts an image, extracts UI, sends to DeepSeek, returns code
app.post('/image-to-code', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  try {
    const uiDescription = await img2code(req.file.path);
    const result = await callDeepSeek(uiDescription);
    res.json({ uiDescription, code: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /deepseek: Accepts a prompt and returns DeepSeek API response
app.post('/deepseek', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  try {
    const result = await callDeepSeek(prompt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /generate: Accepts app definition and returns generated React code
app.post('/generate', (req, res) => {
  const appDefinition = req.body;
  const generatedCode = generateReactApp(appDefinition);
  res.send({ code: generatedCode });
});

// POST /agent/create-app: Uses the AI agent to generate code from description and components
app.post('/agent/create-app', async (req, res) => {
  const { description, components } = req.body || {};
  if (!description && (!components || components.length === 0)) {
    return res.status(400).json({ error: 'Provide description and/or components' });
  }
  try {
    const { code, modelRaw } = await createAppWithAgent({ description, components });
    res.json({ code, modelRaw });
  } catch (err) {
    const fallback = generateReactApp({ components: components || [] });
    res.json({ code: fallback, modelRaw: { error: err.message, fallback: true } });
  }
});

function generateReactApp(definition) {
  const renderComponent = (c) => {
    switch (c.type) {
      case 'Button':
        return `<button>${c.label || 'Button'}</button>`;
      case 'Input':
        return `<input placeholder="${c.label || 'Input'}" />`;
      case 'Form':
        return `<form><input placeholder="Form Input" /></form>`;
      default:
        return `<div>Unknown</div>`;
    }
  };
  return `import React from 'react';\n\nfunction App() {\n  return (\n    <div>\n      ${(definition.components || []).map(renderComponent).join('\n      ')}\n    </div>\n  );\n}\n\nexport default App;\n`;
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
