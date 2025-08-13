"use strict";
/*
 * AI Titan DeepSeek Agent VS Code Extension
 * Copyright (c) 2024 AI Titan. All rights reserved.
 *
 * PROPRIETARY AND CONFIDENTIAL
 *
 * This source code is the exclusive property of AI Titan and is protected by
 * copyright and trade secret laws. Unauthorized copying, distribution, modification,
 * public display, public performance, or public transmission of this software
 * is strictly prohibited and may result in severe civil and criminal penalties.
 *
 * Violators will be prosecuted to the full extent of the law.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const openai_1 = require("openai");
const pricing_service_1 = __importDefault(require("./pricing-service"));
const agent_enforcement_1 = require("./agent-enforcement");
let outputChannel;
let pricingService;
function activate(context) {
    console.log('AI Titan DeepSeek Agent is now active!');
    outputChannel = vscode.window.createOutputChannel('AI Titan');
    // Initialize services
    pricingService = new pricing_service_1.default(context.extensionPath);
    const enforcementService = new agent_enforcement_1.AgentEnforcementService(context);
    // Initialize enforcement system
    enforcementService.initialize();
    // Register commands
    const generateCodeCommand = vscode.commands.registerCommand('ai-titan.generateCode', generateCode);
    const generateCodeDetailedCommand = vscode.commands.registerCommand('ai-titan.generateCodeDetailed', generateCodeDetailed);
    const optimizeCodeCommand = vscode.commands.registerCommand('ai-titan.optimizeCode', optimizeCode);
    const explainCodeCommand = vscode.commands.registerCommand('ai-titan.explainCode', explainCode);
    const debugCodeCommand = vscode.commands.registerCommand('ai-titan.debugCode', debugCode);
    const askQuestionCommand = vscode.commands.registerCommand('ai-titan.askQuestion', askQuestion);
    const openSettingsCommand = vscode.commands.registerCommand('ai-titan.openSettings', openSettings);
    // Register pricing commands
    const viewPackagesCommand = vscode.commands.registerCommand('ai-titan.viewPackages', () => pricingService.showPricingMenu());
    const subscriptionStatusCommand = vscode.commands.registerCommand('ai-titan.subscriptionStatus', () => pricingService.showSubscriptionStatus());
    const upgradeCommand = vscode.commands.registerCommand('ai-titan.upgrade', () => pricingService.showPricingMenu());
    const ownerCodeCommand = vscode.commands.registerCommand('ai-titan.enterOwnerCode', enterOwnerCode);
    context.subscriptions.push(generateCodeCommand, generateCodeDetailedCommand, optimizeCodeCommand, explainCodeCommand, debugCodeCommand, askQuestionCommand, openSettingsCommand, viewPackagesCommand, subscriptionStatusCommand, upgradeCommand, ownerCodeCommand, outputChannel);
}
exports.activate = activate;
async function generateCode() {
    // Check subscription permission
    const hasPermission = await pricingService.checkUsagePermission();
    if (!hasPermission) {
        return;
    }
    const prompt = await vscode.window.showInputBox({
        prompt: 'What code would you like me to generate?',
        placeHolder: 'e.g., Create a function to sort an array'
    });
    if (!prompt)
        return;
    try {
        showProgress('AI Titan is analyzing your request and generating code...');
        const response = await callDeepSeekAPI(`Generate code for: ${prompt}`);
        await insertCodeAtCursor(response);
        showSuccess('Code generated successfully! AI Titan has inserted the generated code at your cursor position.');
    }
    catch (error) {
        showError(`Failed to generate code: ${error}`);
    }
}
async function generateCodeDetailed() {
    // Check subscription permission
    const hasPermission = await pricingService.checkUsagePermission();
    if (!hasPermission) {
        return;
    }
    const prompt = await getDetailedInput('What code would you like me to generate? (Detailed Mode)', 'e.g., Create a function to sort an array\n\nYou can provide detailed specifications, requirements, examples, or any additional context (up to 25,000 characters)');
    if (!prompt)
        return;
    try {
        showProgress('AI Titan is analyzing your detailed request and generating comprehensive code...');
        const response = await callDeepSeekAPI(`Generate code for: ${prompt}`);
        await insertCodeAtCursor(response);
        showSuccess('Detailed code generated successfully! AI Titan has inserted the generated code at your cursor position.');
    }
    catch (error) {
        showError(`Failed to generate code: ${error}`);
    }
}
async function optimizeCode() {
    // Check subscription permission
    const hasPermission = await pricingService.checkUsagePermission();
    if (!hasPermission) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        showError('No active editor found');
        return;
    }
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    if (!selectedText) {
        showError('Please select code to optimize');
        return;
    }
    try {
        showProgress('AI Titan is analyzing your code and preparing optimization suggestions...');
        const response = await callDeepSeekAPI(`Optimize this code and explain the improvements:\n\n${selectedText}`);
        await showResponseInNewTab(response, 'Code Optimization');
        showSuccess('Code optimization completed! AI Titan has analyzed your code and provided optimization suggestions in a new tab.');
    }
    catch (error) {
        showError(`Failed to optimize code: ${error}`);
    }
}
async function explainCode() {
    // Check subscription permission
    const hasPermission = await pricingService.checkUsagePermission();
    if (!hasPermission) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        showError('No active editor found');
        return;
    }
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    if (!selectedText) {
        showError('Please select code to explain');
        return;
    }
    try {
        showProgress('AI Titan is analyzing your code and preparing a detailed explanation...');
        const response = await callDeepSeekAPI(`Explain this code in detail:\n\n${selectedText}`);
        await showResponseInNewTab(response, 'Code Explanation');
        showSuccess('Code explanation completed! AI Titan has provided a detailed explanation of your code in a new tab.');
    }
    catch (error) {
        showError(`Failed to explain code: ${error}`);
    }
}
async function debugCode() {
    // Check subscription permission
    const hasPermission = await pricingService.checkUsagePermission();
    if (!hasPermission) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        showError('No active editor found');
        return;
    }
    const document = editor.document;
    const code = document.getText();
    const issue = await getDetailedInput('Describe the issue you\'re experiencing', 'e.g., Function returns undefined, getting syntax error\n\nProvide detailed error messages, expected vs actual behavior, steps to reproduce, or any relevant context (up to 25,000 characters)');
    if (!issue)
        return;
    try {
        showProgress('AI Titan is analyzing your code and the reported issue to provide debugging assistance...');
        const response = await callDeepSeekAPI(`Debug this code. Issue: ${issue}\n\nCode:\n${code}`);
        await showResponseInNewTab(response, 'Debug Analysis');
        showSuccess('Debug analysis completed! AI Titan has analyzed your code and provided debugging suggestions in a new tab.');
    }
    catch (error) {
        showError(`Failed to debug code: ${error}`);
    }
}
async function openSettings() {
    vscode.commands.executeCommand('workbench.action.openSettings', 'ai-titan');
}
async function askQuestion() {
    // Check subscription permission
    const hasPermission = await pricingService.checkUsagePermission();
    if (!hasPermission) {
        return;
    }
    const question = await getDetailedInput('Ask AI Titan a question', 'You can ask about:\n• What the agent can do\n• How features work\n• Programming questions\n• Code explanations\n• Technical guidance\n• Extension capabilities\n\nProvide your question or request (up to 25,000 characters)');
    if (!question)
        return;
    try {
        // Enhanced prompt that includes agent context and capabilities
        const agentPrompt = `You are AI Titan, an intelligent coding assistant integrated into VS Code. You help users with:

**Core Capabilities:**
- Code generation from natural language descriptions
- Code optimization and improvement suggestions
- Detailed code explanations and documentation
- Debugging assistance and error analysis
- Programming guidance and best practices

**Current Action Context:**
The user is asking you a question through the AI Titan VS Code extension. You should:
1. Provide helpful, detailed responses
2. Explain what you're doing and why
3. Offer actionable advice
4. Be conversational and informative
5. Reference your capabilities when relevant

**User Question:** ${question}

Please provide a comprehensive, helpful response that addresses their question and explains any relevant processes or capabilities.`;
        const response = await callDeepSeekAPI(agentPrompt);
        await showResponseInNewTab(response, 'AI Titan Response');
        showSuccess('AI Titan has provided a detailed response!');
    }
    catch (error) {
        showError(`Failed to get response: ${error}`);
    }
}
async function enterOwnerCode() {
    const ownerCode = await vscode.window.showInputBox({
        prompt: '🔐 Enter Owner Code for Unlimited Access',
        placeHolder: 'Owner access code...',
        password: true,
        ignoreFocusOut: true,
        validateInput: (value) => {
            if (!value || value.trim().length === 0) {
                return 'Owner code cannot be empty';
            }
            return null;
        }
    });
    if (ownerCode) {
        await pricingService.setOwnerCode(ownerCode.trim());
    }
}
async function callDeepSeekAPI(prompt) {
    const config = vscode.workspace.getConfiguration('ai-titan');
    const apiKey = config.get('apiKey');
    const model = config.get('model') || 'deepseek-coder';
    const maxTokens = config.get('maxTokens') || 2048;
    if (!apiKey) {
        throw new Error('DeepSeek API key not configured. Please set it in settings.');
    }
    const client = new openai_1.OpenAI({
        apiKey: apiKey,
        baseURL: 'https://api.deepseek.com'
    });
    outputChannel.appendLine(`[${new Date().toISOString()}] Sending request to DeepSeek API...`);
    try {
        const response = await client.chat.completions.create({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxTokens,
            temperature: 0.1
        });
        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error('No response content received from API');
        }
        outputChannel.appendLine(`[${new Date().toISOString()}] Response received successfully`);
        return content;
    }
    catch (error) {
        outputChannel.appendLine(`[${new Date().toISOString()}] API Error: ${error.message}`);
        // Fallback to demo mode
        if (error.status === 402 || error.message.includes('Insufficient Balance')) {
            outputChannel.appendLine('Switching to demo mode...');
            return getDemoResponse(prompt);
        }
        throw error;
    }
}
function getDemoResponse(prompt) {
    return `# Demo Response for: ${prompt.substring(0, 50)}...

\`\`\`
// This is a demo response since the DeepSeek API is currently unavailable.
// In a real scenario, this would be generated by DeepSeek Coder.

function example_function() {
    // Your AI-generated code would appear here
    return "Hello from AI Titan Demo Mode!";
}

// Note: Configure your DeepSeek API key in settings to get actual responses.
\`\`\`

**Demo Mode Active**: Please configure your DeepSeek API key in the extension settings to get real AI responses.`;
}
async function insertCodeAtCursor(code) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        await showResponseInNewTab(code, 'Generated Code');
        return;
    }
    const position = editor.selection.active;
    await editor.edit(editBuilder => {
        editBuilder.insert(position, code);
    });
}
async function showResponseInNewTab(content, title) {
    const document = await vscode.workspace.openTextDocument({
        content: content,
        language: 'markdown'
    });
    await vscode.window.showTextDocument(document, {
        preview: false,
        viewColumn: vscode.ViewColumn.Beside
    });
}
function showSuccess(message) {
    vscode.window.showInformationMessage(message);
    outputChannel.appendLine(`[${new Date().toISOString()}] SUCCESS: ${message}`);
}
function showError(message) {
    vscode.window.showErrorMessage(message);
    outputChannel.appendLine(`[${new Date().toISOString()}] ERROR: ${message}`);
    outputChannel.show();
}
function showProgress(message) {
    vscode.window.showInformationMessage(message);
    outputChannel.appendLine(`[${new Date().toISOString()}] PROGRESS: ${message}`);
    outputChannel.show();
}
async function getDetailedInput(prompt, placeholder) {
    // Create a new untitled document for detailed input
    const document = await vscode.workspace.openTextDocument({
        content: `/*\n${prompt}\n\n${placeholder}\n\nPlease replace this comment with your detailed description (up to 25,000 characters).\nSave and close this document when finished.\n*/\n\n`,
        language: 'plaintext'
    });
    const editor = await vscode.window.showTextDocument(document);
    return new Promise((resolve) => {
        const disposable = vscode.workspace.onDidSaveTextDocument((savedDoc) => {
            if (savedDoc === document) {
                const content = savedDoc.getText();
                // Remove the instruction comment and extract user input
                const lines = content.split('\n');
                const startIndex = lines.findIndex(line => line.includes('*/'));
                if (startIndex !== -1) {
                    const userInput = lines.slice(startIndex + 1).join('\n').trim();
                    if (userInput && userInput.length <= 25000) {
                        disposable.dispose();
                        vscode.commands.executeCommand('workbench.action.closeActiveEditor');
                        resolve(userInput);
                    }
                    else if (userInput.length > 25000) {
                        showError('Input exceeds 25,000 character limit. Please shorten your description.');
                        // Don't resolve, let user edit again
                    }
                    else {
                        showError('Please provide a description before saving.');
                        // Don't resolve, let user edit again
                    }
                }
                else {
                    const userInput = content.trim();
                    if (userInput && userInput.length <= 25000) {
                        disposable.dispose();
                        vscode.commands.executeCommand('workbench.action.closeActiveEditor');
                        resolve(userInput);
                    }
                    else if (userInput.length > 25000) {
                        showError('Input exceeds 25,000 character limit. Please shorten your description.');
                    }
                    else {
                        showError('Please provide a description before saving.');
                    }
                }
            }
        });
        // Handle case where user closes without saving
        const closeDisposable = vscode.workspace.onDidCloseTextDocument((closedDoc) => {
            if (closedDoc === document) {
                disposable.dispose();
                closeDisposable.dispose();
                resolve(undefined);
            }
        });
    });
}
function deactivate() {
    if (outputChannel) {
        outputChannel.dispose();
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map