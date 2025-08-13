# AI Titan DeepSeek Agent

🤖 **Powerful AI coding assistant powered by DeepSeek Coder for VS Code**

Transform your coding experience with intelligent code generation, optimization, and debugging assistance directly in your VS Code editor.

## ✨ Features

- **🚀 Code Generation**: Generate code from natural language descriptions
- **⚡ Code Optimization**: Optimize selected code with AI suggestions
- **📖 Code Explanation**: Get detailed explanations of complex code
- **🐛 Debug Assistant**: AI-powered debugging help
- **🎯 Context-Aware**: Works with your current code context
- **🔧 Customizable**: Configure API settings and preferences

## 🛠️ Installation

1. Install the extension from VS Code Marketplace
2. Get your DeepSeek API key from [DeepSeek Platform](https://platform.deepseek.com/)
3. Configure the API key in VS Code settings:
   - Open Settings (`Ctrl+,` or `Cmd+,`)
   - Search for "AI Titan"
   - Enter your DeepSeek API key

## 🚀 Getting Started

1. Install the extension from the VS Code Marketplace
2. Open any code file in VS Code
3. **Start with 5 FREE credits** - Try all features risk-free!
4. Use the Command Palette (`Ctrl+Shift+P`) to access AI Titan features:
   - `AI Titan: Generate Code` - Generate code from natural language
   - `AI Titan: Optimize Code` - Optimize selected code
   - `AI Titan: Explain Code` - Get detailed code explanations
   - `AI Titan: Debug Code` - Get debugging assistance
   - `AI Titan: View Packages` - See pricing and subscription options

### 💳 Pricing Model

**Free Trial**: Start with 5 free credits to explore all features
**After Trial**: Subscription or lifetime purchase required to continue

- **Warrior Basic**: $5.41/month - Unlimited usage
- **Warrior Pro**: $10.82/month - Advanced features + priority support
- **Warrior Elite**: $21.64/month - Premium features + team collaboration
- **Lifetime Packages**: One-time purchase options available

## 🚀 Usage

### Command Palette
Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and search for:

- **AI Titan: Generate Code** - Generate code from description
- **AI Titan: Optimize Selected Code** - Optimize highlighted code
- **AI Titan: Explain Selected Code** - Get code explanations
- **AI Titan: Debug Code** - Get debugging assistance

### Context Menu
Right-click on selected code to access:
- Optimize Selected Code
- Explain Selected Code

### Keyboard Shortcuts
Customize shortcuts in VS Code settings for faster access.

## ⚙️ Configuration

| Setting | Description | Default |
|---------|-------------|----------|
| `ai-titan.apiKey` | Your DeepSeek API key | `""` |
| `ai-titan.model` | DeepSeek model to use | `"deepseek-coder"` |
| `ai-titan.maxTokens` | Maximum response tokens | `2048` |

## 🎯 Examples

### Generate Code
1. Run "AI Titan: Generate Code"
2. Enter: "Create a function to validate email addresses"
3. AI generates the function at your cursor

### Optimize Code
1. Select inefficient code
2. Right-click → "Optimize Selected Code"
3. View optimization suggestions in new tab

### Explain Code
1. Select complex code
2. Right-click → "Explain Selected Code"
3. Get detailed explanation in new tab

## 🔒 Privacy & Security

- Your code is sent to DeepSeek API for processing
- API key is stored securely in VS Code settings
- No data is stored on our servers
- Review DeepSeek's privacy policy for details

## 🛠️ Development & Building

### Icon Assets
The extension includes multiple icon formats for optimal display:
- `images/icon.png` - Main extension icon (128x128 recommended)
- `images/icon-32x32.png` - Small icon for toolbars and lists
- `images/icon-256x256.png` - High-resolution icon for detailed views
- `images/icon.svg` - Vector source file

### Building VSIX Package
1. Install dependencies: `npm install`
2. Compile TypeScript: `npm run compile`
3. Package extension: `npm run package`
4. Or use the automated script: `./build-vsix.ps1`

### Icon Requirements
- PNG format required for VS Code Marketplace
- Recommended sizes: 32x32, 128x128, 256x256
- Transparent background preferred
- High contrast for dark/light themes

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/ai-titan-deepseek-agent/issues)
- **Documentation**: [GitHub Wiki](https://github.com/your-username/ai-titan-deepseek-agent/wiki)
- **Email**: support@ai-titan.dev

## 📄 License & Copyright

**PROPRIETARY SOFTWARE - ALL RIGHTS RESERVED**

Copyright © 2024 AI Titan. All rights reserved.

This software is proprietary and confidential. Unauthorized use, copying, distribution, or modification is strictly prohibited and may result in legal action. Use is permitted only under valid subscription or lifetime license.

⚠️ **WARNING**: This software is protected by copyright law. Violations will be prosecuted to the full extent of the law.

See [LICENSE](LICENSE) file for complete terms and conditions.

## 🙏 Acknowledgments

- Powered by [DeepSeek Coder](https://deepseek.com/)
- Built for the VS Code community

---

**Made with ❤️ by AI Titan Team**

[⭐ Rate this extension](https://marketplace.visualstudio.com/items?itemName=ai-titan.ai-titan-deepseek-agent&ssr=false#review-details) | [🐛 Report Issues](https://github.com/your-username/ai-titan-deepseek-agent/issues) | [💡 Feature Requests](https://github.com/your-username/ai-titan-deepseek-agent/issues/new?template=feature_request.md)