
# TitanForge Backend

## DeepSeek Integration

This backend exposes a `/deepseek` endpoint that uses your DeepSeek API key from `.env` to power AI features.

### Usage
1. Ensure your `.env` file contains:
	```
	DeepSeek=YOUR_API_KEY
	```
2. Start the backend:
	```bash
	npm start
	```
3. Test the DeepSeek endpoint:
	```bash
	node test-deepseek.js
	```
	You should see a response from the DeepSeek API.

### Endpoint
- **POST /deepseek**
  - Body: `{ "prompt": "your prompt here" }`
  - Returns: DeepSeek API response

---

You can now connect your frontend to this endpoint for AI-powered app generation and suggestions.
