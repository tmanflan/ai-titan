// API utility to call backend code generator
export async function generateCode(components) {
  const res = await fetch('http://localhost:4000/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ components }),
  });
  const data = await res.json();
  return data.code;
}
