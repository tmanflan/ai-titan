const { callDeepSeek } = require('./deepseek');

function buildAgentPrompt(description, components) {
  const componentsJson = JSON.stringify(components, null, 2);
  return [
    'You are TitanForge, an expert full-stack app-creating agent.',
    'Given an app description and a list of UI components, produce a single-file React app (App.js).',
    'Requirements:',
    '- Use functional React components.',
    '- Render the provided components with sensible defaults and labels.',
    '- Do not include explanations. Return ONLY the code for App.js inside a single fenced code block.',
    '',
    'App Description:',
    description || '(no description provided)',
    '',
    'Components JSON:',
    componentsJson,
  ].join('\n');
}

function stripCodeFence(text) {
  if (!text) return '';
  const fenceRegex = /```[a-zA-Z]*\n([\s\S]*?)```/m;
  const match = text.match(fenceRegex);
  if (match) return match[1].trim();
  return text.trim();
}

function extractModelText(modelResponse) {
  if (!modelResponse) return '';
  if (typeof modelResponse === 'string') return modelResponse;
  if (modelResponse.text) return modelResponse.text;
  if (Array.isArray(modelResponse.choices) && modelResponse.choices[0]) {
    const choice = modelResponse.choices[0];
    if (typeof choice === 'string') return choice;
    if (choice.text) return choice.text;
    if (choice.message && choice.message.content) return choice.message.content;
  }
  return JSON.stringify(modelResponse);
}

async function createAppWithAgent({ description, components }) {
  const prompt = buildAgentPrompt(description, components || []);
  const modelResponse = await callDeepSeek(prompt);
  const rawText = extractModelText(modelResponse);
  const code = stripCodeFence(rawText);
  return { code, modelRaw: modelResponse };
}

module.exports = { createAppWithAgent };