# DeepSeek Agent - Automated Usage Guide

This guide explains how to use the automated DeepSeek agent in various ways.

## Quick Start

### Option 1: Python Script (Recommended)
```bash
python run_agent.py "Write a Python function to calculate fibonacci numbers"
```

### Option 2: Windows Batch File
```cmd
agent.bat "Explain how React hooks work"
```

### Option 3: PowerShell Script
```powershell
.\agent.ps1 "Debug this JavaScript code: console.log('hello')"
```

## Interactive Mode

For continuous conversations with the agent:

```bash
# Python
python run_agent.py --interactive

# PowerShell
.\agent.ps1 -Interactive

# Batch
agent.bat --interactive
```

## Advanced Options

### Customize Model Parameters

```bash
# Change temperature (creativity level: 0.0 = focused, 1.0 = creative)
python run_agent.py "Write a story" --temperature 0.9

# Limit response length
python run_agent.py "Explain AI" --max-tokens 500

# Use different model (if available)
python run_agent.py "Code review" --model deepseek-coder-v2
```

### PowerShell Advanced Usage

```powershell
# All options
.\agent.ps1 "Write a REST API" -Temperature 0.5 -MaxTokens 800 -Model "deepseek-coder"

# Interactive with custom settings
.\agent.ps1 -Interactive -Temperature 0.8
```

## File Structure

- `agent.py` - Original simple agent
- `run_agent.py` - Advanced automated agent with CLI
- `agent.bat` - Windows batch script wrapper
- `agent.ps1` - PowerShell script wrapper
- `AGENT_USAGE.md` - This documentation

## Examples

### Code Generation
```bash
python run_agent.py "Create a Python class for a shopping cart with add, remove, and total methods"
```

### Code Review
```bash
python run_agent.py "Review this code and suggest improvements: def calc(x,y): return x+y*2"
```

### Debugging
```bash
python run_agent.py "Why is this code not working: for i in range(10) print(i)"
```

### Documentation
```bash
python run_agent.py "Write documentation for a function that sorts an array using quicksort"
```

### Architecture Questions
```bash
python run_agent.py "What's the best way to structure a React application with authentication?"
```

## Interactive Mode Commands

When in interactive mode, you can:
- Type any prompt and press Enter
- Type `quit`, `exit`, or `q` to stop
- Use Ctrl+C to force quit

## Troubleshooting

### Python Not Found
```bash
# Make sure you're in the right directory
cd c:\Users\flana\ai-titan\app-builder-frontend

# Activate virtual environment if needed
../.venv/Scripts/activate

# Install dependencies
pip install openai
```

### API Errors
- Check your internet connection
- Verify the DeepSeek API key is valid
- Try reducing max_tokens if you get quota errors

### Permission Errors (PowerShell)
```powershell
# If you get execution policy errors
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Configuration

To change the API key or other settings, edit the `run_agent.py` file:

```python
# Line 23-26
client = OpenAI(
    api_key="your-new-api-key-here",
    base_url="https://api.deepseek.com"
)
```

## Tips

1. **Be Specific**: More detailed prompts get better results
2. **Use Examples**: Include examples in your prompts when possible
3. **Iterate**: Use interactive mode for back-and-forth conversations
4. **Save Responses**: Copy important responses to files for later use
5. **Experiment**: Try different temperature values for different types of tasks

## Common Use Cases

| Task | Temperature | Max Tokens | Example |
|------|-------------|------------|---------|
| Code Generation | 0.3-0.5 | 500-1000 | "Write a function to..." |
| Creative Writing | 0.7-0.9 | 800-1500 | "Write a story about..." |
| Code Review | 0.2-0.4 | 300-600 | "Review this code..." |
| Explanations | 0.5-0.7 | 400-800 | "Explain how..." |
| Debugging | 0.2-0.3 | 200-500 | "Fix this error..." |

Enjoy using your automated DeepSeek agent! 🚀