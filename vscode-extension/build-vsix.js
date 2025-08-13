const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building AI Titan DeepSeek Agent VSIX Package...');
console.log('=' .repeat(50));

// Check if required tools are installed
function checkRequirements() {
    console.log('📋 Checking requirements...');
    
    try {
        execSync('npm --version', { stdio: 'ignore' });
        console.log('✅ npm found');
    } catch (error) {
        console.error('❌ npm not found. Please install Node.js');
        process.exit(1);
    }
    
    try {
        execSync('npx vsce --version', { stdio: 'ignore' });
        console.log('✅ vsce found');
    } catch (error) {
        console.log('📦 Installing vsce...');
        execSync('npm install -g @vscode/vsce', { stdio: 'inherit' });
    }
}

// Install dependencies
function installDependencies() {
    console.log('\n📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
}

// Compile TypeScript
function compileTypeScript() {
    console.log('\n🔨 Compiling TypeScript...');
    execSync('npm run compile', { stdio: 'inherit' });
    console.log('✅ TypeScript compiled');
}

// Create PNG icon from SVG (simple conversion)
function createIcon() {
    console.log('\n🎨 Creating icon...');
    
    // Create a simple PNG icon placeholder
    const iconDir = path.join(__dirname, 'images');
    const iconPath = path.join(iconDir, 'icon.png');
    
    if (!fs.existsSync(iconPath)) {
        console.log('⚠️  PNG icon not found. Please convert icon.svg to icon.png manually');
        console.log('   You can use online tools like: https://convertio.co/svg-png/');
        console.log('   Or use ImageMagick: convert icon.svg icon.png');
    } else {
        console.log('✅ Icon found');
    }
}

// Package extension
function packageExtension() {
    console.log('\n📦 Packaging extension...');
    
    try {
        // Clean previous builds
        if (fs.existsSync('*.vsix')) {
            execSync('del *.vsix', { stdio: 'ignore' });
        }
        
        // Package the extension
        execSync('npx vsce package', { stdio: 'inherit' });
        
        // Find the generated VSIX file
        const files = fs.readdirSync('.');
        const vsixFile = files.find(file => file.endsWith('.vsix'));
        
        if (vsixFile) {
            console.log(`\n🎉 Extension packaged successfully: ${vsixFile}`);
            console.log('\n📋 Next steps:');
            console.log('1. Test the extension:');
            console.log(`   code --install-extension ${vsixFile}`);
            console.log('2. Publish to marketplace:');
            console.log(`   npx vsce publish`);
            console.log('3. Or upload manually to:');
            console.log('   https://marketplace.visualstudio.com/manage');
        } else {
            console.error('❌ VSIX file not found');
        }
        
    } catch (error) {
        console.error('❌ Packaging failed:', error.message);
        process.exit(1);
    }
}

// Main build process
function main() {
    try {
        checkRequirements();
        installDependencies();
        compileTypeScript();
        createIcon();
        packageExtension();
        
        console.log('\n🎊 Build completed successfully!');
        console.log('\n💰 Ready for VS Code Marketplace!');
        
    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { main };