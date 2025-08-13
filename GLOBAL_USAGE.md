# AI Titan DeepSeek Agent - Global Usage Guide

## 🚀 One-Time Installation

Install the agent globally so you can use it from any project or folder:

### Windows (Recommended)
```bash
# Run the installation script
.\install.bat
```

### Cross-Platform
```bash
# Using Python
python install.py

# Or manually
pip install -e .
```

## 📋 Global Usage

Once installed, you can use the agent from **anywhere** on your system:

### 1. Command Line Usage

```bash
# Basic usage
deepseek-agent "Write a Python function to sort a list"

# Interactive mode
deepseek-agent --interactive

# With custom parameters
deepseek-agent "Explain machine learning" --temperature 0.3 --max-tokens 800
```

### 2. In Any Python Project

```python
# Import the agent in any Python file
from ai_titan.agent import run_deepseek_agent

# Use it directly
response = run_deepseek_agent("Generate a REST API endpoint")
print(response)

# With custom parameters
response = run_deepseek_agent(
    "Create a React component",
    temperature=0.7,
    max_tokens=1000
)
```

### 3. In Different Project Folders

```bash
# Navigate to any project
cd C:\Users\YourName\my-web-app
deepseek-agent "Help me debug this JavaScript code"

# Or from another project
cd C:\Users\YourName\my-python-project
deepseek-agent "Write unit tests for this function"
```

## 🔧 Configuration

### API Key Management

The agent uses the API key configured during installation. To update it:

1. **Find the installation location:**
   ```bash
   python -c "import ai_titan; print(ai_titan.__file__)"
   ```

2. **Edit the agent.py file** and update the API key

3. **Or set environment variable:**
   ```bash
   # Windows
   set DEEPSEEK_API_KEY=your-new-api-key
   
   # Linux/Mac
   export DEEPSEEK_API_KEY=your-new-api-key
   ```

## 🌟 Use Cases

### Web Development Projects
```bash
cd my-react-app
deepseek-agent "Create a responsive navbar component"
deepseek-agent "Help me optimize this CSS for mobile"
```

### Data Science Projects
```bash
cd my-data-analysis
deepseek-agent "Write a pandas script to clean this dataset"
deepseek-agent "Create a matplotlib visualization"
```

### Backend Development
```bash
cd my-api-server
deepseek-agent "Design a database schema for user management"
deepseek-agent "Write middleware for authentication"
```

### Mobile App Development
```bash
cd my-flutter-app
deepseek-agent "Create a login screen widget"
deepseek-agent "Help me implement state management"
```

## 🔄 Integration Examples

### In Build Scripts
```python
# build.py
from ai_titan.agent import run_deepseek_agent

def generate_docs():
    code_content = read_file("main.py")
    prompt = f"Generate documentation for this code:\n{code_content}"
    docs = run_deepseek_agent(prompt)
    write_file("README.md", docs)
```

### In Development Workflows
```python
# dev_helper.py
from ai_titan.agent import run_deepseek_agent

def code_review_helper(file_path):
    with open(file_path, 'r') as f:
        code = f.read()
    
    review = run_deepseek_agent(
        f"Review this code for best practices and suggest improvements:\n{code}"
    )
    return review
```

### In IDEs and Editors
```python
# VS Code extension or similar
from ai_titan.agent import run_deepseek_agent

def explain_selected_code(selected_text):
    explanation = run_deepseek_agent(
        f"Explain what this code does:\n{selected_text}"
    )
    return explanation
```

## 🛠️ Advanced Features

### Custom Model Parameters
```python
from ai_titan.agent import run_deepseek_agent

# For creative tasks
response = run_deepseek_agent(
    "Write a creative story",
    temperature=0.9,  # More creative
    max_tokens=2000
)

# For precise code generation
response = run_deepseek_agent(
    "Write a sorting algorithm",
    temperature=0.1,  # More precise
    max_tokens=500
)
```

### Batch Processing
```python
from ai_titan.agent import run_deepseek_agent

prompts = [
    "Generate a login function",
    "Create a user registration form",
    "Write password validation logic"
]

responses = []
for prompt in prompts:
    response = run_deepseek_agent(prompt)
    responses.append(response)
    print(f"Generated: {prompt}")
```

## 🚨 Troubleshooting

### Command Not Found
```bash
# Reinstall the package
pip install -e .

# Or check if it's in PATH
which deepseek-agent  # Linux/Mac
where deepseek-agent  # Windows
```

### Import Errors
```bash
# Check installation
pip list | grep ai-titan

# Reinstall if needed
pip uninstall ai-titan
pip install -e .
```

### API Issues
- Check your API key balance
- Verify internet connection
- The agent will automatically switch to demo mode if API fails

## 📚 Examples Repository

Create a folder with common prompts:

```bash
mkdir deepseek-prompts
cd deepseek-prompts

# Save common prompts
echo "deepseek-agent 'Generate a REST API endpoint'" > api.bat
echo "deepseek-agent 'Create a React component'" > react.bat
echo "deepseek-agent 'Write unit tests'" > test.bat
```

## 🎯 Best Practices

1. **Use specific prompts** for better results
2. **Adjust temperature** based on task type
3. **Set appropriate max_tokens** to control response length
4. **Use interactive mode** for iterative development
5. **Integrate into your workflow** with custom scripts

---

**🎉 Congratulations!** You now have a globally accessible AI coding assistant that works across all your projects!