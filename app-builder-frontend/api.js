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

// API utility to convert image to code
export async function imageToCode(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const res = await fetch('http://localhost:4000/image-to-code', {
    method: 'POST',
    body: formData,
  });
  
  const data = await res.json();
  return data.code;
}
