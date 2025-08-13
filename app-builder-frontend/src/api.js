// API functions for the app builder

export async function imageToCode(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch('http://localhost:4000/image-to-code', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to convert image to code');
  }

  const data = await response.json();
  return data.code;
}

export async function generateCode(description) {
  const response = await fetch('http://localhost:4000/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate code');
  }

  const data = await response.json();
  return data.code;
}