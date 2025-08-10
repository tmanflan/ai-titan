// Placeholder API file for code generation
export async function generateCode(components) {
  const res = await fetch('http://localhost:4000/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ components }),
  });
  if (!res.ok) throw new Error('Generate request failed');
  const data = await res.json();
  return data.code;
}

export async function generateWithAgent(description, components) {
  const res = await fetch('http://localhost:4000/agent/create-app', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, components }),
  });
  if (!res.ok) throw new Error('Agent request failed');
  const data = await res.json();
  return data.code;
}
