"use strict";
/*
 * AI Titan DeepSeek Agent VS Code Extension - Pricing Service
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingService = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
class PricingService {
    constructor(extensionPath) {
        this.userSubscriptions = new Map();
        this.encryptionKey = 'AI_TITAN_SECURE_KEY_2024_PROPRIETARY';
        this.algorithm = 'aes-256-cbc';
        this.ownerIdentifier = Buffer.from('MTlGbGFuYXJ5NzJUaXRhbg==', 'base64').toString('utf8');
        this.configKeyHash = Buffer.from('b3duZXJDb2RlSGFzaA==', 'base64').toString('utf8');
        this.securitySalt = crypto.createHash('md5').update('AI_TITAN_OWNER_SALT_2024').digest('hex').substring(0, 16);
        this.configPath = path.join(extensionPath, 'pricing-config.json');
        this.loadConfig();
        this.loadUserSubscriptions();
    }
    loadConfig() {
        try {
            const configData = fs.readFileSync(this.configPath, 'utf8');
            this.config = JSON.parse(configData);
        }
        catch (error) {
            vscode.window.showErrorMessage('Failed to load pricing configuration');
            throw error;
        }
    }
    loadUserSubscriptions() {
        // In a real implementation, this would load from a secure backend
        // For now, we'll use VS Code's global state
        const context = vscode.workspace.getConfiguration('ai-titan');
        const subscriptionData = context.get('userSubscription');
        if (subscriptionData) {
            // Load existing subscription data
            console.log('Loaded user subscription data');
        }
    }
    getAllPackages() {
        return this.config.pricing.packages;
    }
    getPackage(packageId) {
        return this.config.pricing.packages[packageId];
    }
    getAvailablePackages() {
        const available = {};
        for (const [id, pkg] of Object.entries(this.config.pricing.packages)) {
            // Check if limited offer is still available
            if (pkg.limitedOffer) {
                if (pkg.limitedOffer.currentCount < pkg.limitedOffer.maxSubscribers) {
                    available[id] = pkg;
                }
            }
            else {
                available[id] = pkg;
            }
        }
        return available;
    }
    async showPricingMenu() {
        const packages = this.getAvailablePackages();
        const items = [];
        for (const [id, pkg] of Object.entries(packages)) {
            let label;
            let description = pkg.description;
            if (pkg.type === 'free') {
                label = `🆓 ${pkg.name} - FREE TRIAL`;
                description = `5 FREE credits only - Subscription required after trial`;
            }
            else if (pkg.type === 'lifetime') {
                label = `💎 ${pkg.name} - $${pkg.totalPrice.toFixed(2)} (One-time)`;
                description = `Lifetime access • ${pkg.description}`;
            }
            else {
                label = `⚡ ${pkg.name} - $${pkg.totalPrice.toFixed(2)}`;
                if (pkg.type === 'monthly') {
                    label += '/month';
                }
                else if (pkg.type === 'annual') {
                    label += '/year';
                }
                description = `Unlimited usage • ${pkg.description}`;
            }
            if (pkg.limitedOffer) {
                const remaining = pkg.limitedOffer.maxSubscribers - pkg.limitedOffer.currentCount;
                description += ` (${remaining} spots remaining!)`;
            }
            items.push({
                label,
                description,
                detail: pkg.features.join(' • '),
                picked: false
            });
        }
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: '🚀 Choose your AI Titan Warrior package',
            title: 'AI Titan Pricing - Subscription Required After Free Trial'
        });
        if (selected) {
            const packageId = Object.keys(packages).find(id => selected.label.includes(packages[id].name));
            if (packageId) {
                await this.initiateSubscription(packageId);
            }
        }
    }
    async initiateSubscription(packageId) {
        const pkg = this.getPackage(packageId);
        if (!pkg) {
            vscode.window.showErrorMessage('Package not found');
            return;
        }
        if (packageId === 'free') {
            // Free package - no payment required, exactly 5 credits
            const subscription = {
                packageId: 'free',
                userId: 'free-user',
                status: 'active',
                startDate: new Date(),
                creditsRemaining: 5,
                verificationStatus: 'verified'
            };
            await this.saveSubscription(subscription);
            vscode.window.showInformationMessage(`🎉 Welcome to AI Titan!\n\n` +
                `You now have 5 free credits to try our powerful AI features. ` +
                `After using all credits, you'll need to subscribe to continue.\n\n` +
                `Enjoy exploring AI-powered code generation, optimization, and debugging!`, 'Get Started');
            return;
        }
        // Show package details
        const proceed = await vscode.window.showInformationMessage(`Subscribe to ${pkg.name}?\n\n` +
            `Price: $${pkg.totalPrice.toFixed(2)} (includes $${pkg.tax?.toFixed(2) || '0.00'} tax)\n` +
            `Features: ${pkg.features.join(', ')}\n\n` +
            `Verification required: ${this.getVerificationDescription(pkg.verification)}`, 'Subscribe', 'Cancel');
        if (proceed === 'Subscribe') {
            await this.processSubscription(packageId, pkg);
        }
    }
    async processSubscription(packageId, pkg) {
        try {
            // Step 1: Collect user information
            const userInfo = await this.collectUserInformation(pkg.verification);
            if (!userInfo) {
                return; // User cancelled
            }
            // Step 2: Process payment (if not free)
            if (pkg.type !== 'free') {
                const paymentSuccess = await this.processPayment(pkg);
                if (!paymentSuccess) {
                    vscode.window.showErrorMessage('Payment processing failed');
                    return;
                }
            }
            // Step 3: Create subscription
            const subscription = {
                packageId,
                userId: userInfo.userId,
                status: 'pending_verification',
                startDate: new Date(),
                creditsRemaining: pkg.credits,
                verificationStatus: 'pending',
                paymentMethod: userInfo.paymentMethod
            };
            if (pkg.type === 'monthly') {
                subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            }
            else if (pkg.type === 'annual') {
                subscription.endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
            }
            // Step 4: Save subscription
            await this.saveSubscription(subscription);
            // Step 5: Update limited offer count
            if (pkg.limitedOffer) {
                await this.updateLimitedOfferCount(packageId);
            }
            vscode.window.showInformationMessage(`Successfully subscribed to ${pkg.name}! ` +
                `Your subscription is pending verification. You'll receive an email confirmation shortly.`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Subscription failed: ${error}`);
        }
    }
    async collectUserInformation(verificationType) {
        const verificationReqs = this.config.pricing.verification[verificationType];
        const userInfo = {};
        // Collect email
        const email = await vscode.window.showInputBox({
            prompt: 'Enter your email address',
            validateInput: (value) => {
                if (!value || !value.includes('@')) {
                    return 'Please enter a valid email address';
                }
                return null;
            }
        });
        if (!email)
            return null;
        userInfo.email = email;
        userInfo.userId = email; // Use email as user ID for simplicity
        // Collect additional information based on verification type
        if (verificationReqs.required.includes('company_info')) {
            const company = await vscode.window.showInputBox({
                prompt: 'Enter your company name'
            });
            if (!company)
                return null;
            userInfo.company = company;
        }
        if (verificationReqs.required.includes('valid_payment_method')) {
            const paymentMethod = await vscode.window.showQuickPick(['Credit Card', 'PayPal', 'Bank Transfer'], { placeHolder: 'Select payment method' });
            if (!paymentMethod)
                return null;
            userInfo.paymentMethod = paymentMethod;
        }
        return userInfo;
    }
    async processPayment(pkg) {
        // In a real implementation, this would integrate with payment processors
        // For now, we'll simulate payment processing
        const proceed = await vscode.window.showInformationMessage(`Process payment of $${pkg.totalPrice.toFixed(2)}?\n\n` +
            `This will open your default browser to complete the payment.`, 'Proceed to Payment', 'Cancel');
        if (proceed === 'Proceed to Payment') {
            // Open payment URL (would be real payment processor in production)
            const paymentUrl = `https://payment.ai-titan.dev/checkout?package=${pkg.name}&amount=${pkg.totalPrice}`;
            vscode.env.openExternal(vscode.Uri.parse(paymentUrl));
            // Simulate payment confirmation
            const confirmed = await vscode.window.showInformationMessage('Please complete the payment in your browser, then click "Payment Completed" when done.', 'Payment Completed', 'Cancel');
            return confirmed === 'Payment Completed';
        }
        return false;
    }
    async saveSubscription(subscription) {
        // In production, this would save to a secure backend
        // For now, save to VS Code settings
        const config = vscode.workspace.getConfiguration('ai-titan');
        await config.update('userSubscription', subscription, vscode.ConfigurationTarget.Global);
        this.userSubscriptions.set(subscription.userId, subscription);
    }
    async updateLimitedOfferCount(packageId) {
        // In production, this would update the backend counter
        // For now, we'll just log it
        console.log(`Updated limited offer count for package: ${packageId}`);
    }
    getVerificationDescription(verificationType) {
        const verification = this.config.pricing.verification[verificationType];
        return verification ? verification.description : 'Standard verification';
    }
    async getCurrentSubscription() {
        const config = vscode.workspace.getConfiguration('ai-titan');
        const subscription = config.get('userSubscription');
        if (subscription && this.isSubscriptionValid(subscription)) {
            return subscription;
        }
        return null;
    }
    isSubscriptionValid(subscription) {
        if (subscription.status !== 'active') {
            return false;
        }
        if (subscription.endDate && new Date() > new Date(subscription.endDate)) {
            return false;
        }
        return true;
    }
    encrypt(text) {
        const saltedKey = this.encryptionKey + this.securitySalt;
        const key = crypto.createHash('sha256').update(saltedKey).digest();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipher(this.algorithm, key);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + ':' + encrypted;
    }
    decrypt(encryptedText) {
        try {
            const saltedKey = this.encryptionKey + this.securitySalt;
            const key = crypto.createHash('sha256').update(saltedKey).digest();
            const textParts = encryptedText.split(':');
            const iv = Buffer.from(textParts.shift(), 'hex');
            const encryptedData = textParts.join(':');
            const decipher = crypto.createDecipher(this.algorithm, key);
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        catch (error) {
            return '';
        }
    }
    getEncryptedOwnerCode() {
        // Encrypted version of owner identifier
        return this.encrypt(this.ownerIdentifier);
    }
    async validateOwnerCode() {
        const config = vscode.workspace.getConfiguration('ai-titan');
        const storedEncryptedCode = config.get(this.configKeyHash);
        if (storedEncryptedCode) {
            const decryptedCode = this.decrypt(storedEncryptedCode);
            if (decryptedCode === this.ownerIdentifier) {
                return true;
            }
        }
        return false;
    }
    async setOwnerCode(inputCode) {
        if (inputCode === this.ownerIdentifier) {
            const config = vscode.workspace.getConfiguration('ai-titan');
            const encryptedCode = this.encrypt(inputCode);
            await config.update(this.configKeyHash, encryptedCode, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage('🔐 Owner access granted! Unlimited usage activated.', { modal: true });
            return true;
        }
        else {
            vscode.window.showErrorMessage('❌ Invalid owner code. Access denied.', { modal: true });
            return false;
        }
    }
    async checkUsagePermission() {
        // Check for owner code first - grants unlimited usage
        if (await this.validateOwnerCode()) {
            return true;
        }
        const subscription = await this.getCurrentSubscription();
        if (!subscription) {
            // No subscription, offer free package
            const useFree = await vscode.window.showInformationMessage('No active subscription found. Would you like to use the free Warrior Starter package (5 credits)?', 'Use Free Package', 'View Packages', 'Cancel');
            if (useFree === 'Use Free Package') {
                await this.initiateSubscription('free');
                return false; // Need to wait for subscription to be processed
            }
            else if (useFree === 'View Packages') {
                await this.showPricingMenu();
                return false;
            }
            return false;
        }
        // Check credits for free package
        if (subscription.packageId === 'free') {
            if (!subscription.creditsRemaining || subscription.creditsRemaining <= 0) {
                const upgrade = await vscode.window.showWarningMessage('🚫 Free Credits Exhausted!\n\n' +
                    'You have used all 5 free credits from your Warrior Starter package. ' +
                    'To continue using AI Titan, you must purchase a subscription or lifetime package.\n\n' +
                    'Choose from our Warrior packages starting at just $5.41/month!', {
                    modal: true,
                    detail: 'Subscription or lifetime purchase required to continue'
                }, 'View Packages', 'Upgrade Now');
                if (upgrade === 'View Packages' || upgrade === 'Upgrade Now') {
                    await this.showPricingMenu();
                }
                // Block usage - no more free credits
                return false;
            }
            // Show remaining credits warning
            if (subscription.creditsRemaining <= 2) {
                vscode.window.showWarningMessage(`⚠️ Only ${subscription.creditsRemaining} free credits remaining! ` +
                    'Consider upgrading to unlimited usage.', 'View Packages').then(selection => {
                    if (selection === 'View Packages') {
                        this.showPricingMenu();
                    }
                });
            }
            // Deduct credit
            subscription.creditsRemaining--;
            await this.saveSubscription(subscription);
            // Show credit usage notification
            vscode.window.showInformationMessage(`✅ Credit used. ${subscription.creditsRemaining} credits remaining.`);
        }
        return true;
    }
    async showSubscriptionStatus() {
        const subscription = await this.getCurrentSubscription();
        if (!subscription) {
            vscode.window.showInformationMessage('No active subscription found. Click to view available packages.', 'View Packages').then(selection => {
                if (selection === 'View Packages') {
                    this.showPricingMenu();
                }
            });
            return;
        }
        const pkg = this.getPackage(subscription.packageId);
        let statusMessage = `Active Subscription: ${pkg?.name || subscription.packageId}\n`;
        statusMessage += `Status: ${subscription.status}\n`;
        if (subscription.endDate) {
            statusMessage += `Expires: ${new Date(subscription.endDate).toLocaleDateString()}\n`;
        }
        if (subscription.creditsRemaining !== undefined) {
            statusMessage += `Credits Remaining: ${subscription.creditsRemaining}\n`;
        }
        vscode.window.showInformationMessage(statusMessage, 'Manage Subscription', 'Upgrade').then(selection => {
            if (selection === 'Manage Subscription') {
                // Open subscription management (would be web portal in production)
                vscode.env.openExternal(vscode.Uri.parse('https://manage.ai-titan.dev'));
            }
            else if (selection === 'Upgrade') {
                this.showPricingMenu();
            }
        });
    }
}
exports.PricingService = PricingService;
exports.default = PricingService;
//# sourceMappingURL=pricing-service.js.map