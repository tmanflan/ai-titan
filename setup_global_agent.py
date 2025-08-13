#!/usr/bin/env python3
"""
Automated Setup Script for AI Titan DeepSeek Agent
This script automates the entire process of setting up the agent globally.
"""

import subprocess
import sys
import os
from pathlib import Path
import shutil

def run_command(cmd, description, check=True):
    """Run a command and handle errors"""
    print(f"\n🔧 {description}...")
    try:
        result = subprocess.run(cmd, shell=True, check=check, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {description} completed successfully")
        else:
            print(f"⚠️  {description} completed with warnings")
        return result
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during {description}:")
        print(f"Command: {cmd}")
        print(f"Error: {e.stderr}")
        return None

def create_package_structure():
    """Create the package structure if it doesn't exist"""
    print("\n📁 Setting up package structure...")
    
    # Create ai_titan directory
    ai_titan_dir = Path("ai_titan")
    ai_titan_dir.mkdir(exist_ok=True)
    
    # Create __init__.py
    init_file = ai_titan_dir / "__init__.py"
    if not init_file.exists():
        init_content = '''"""AI Titan - DeepSeek Agent Automation Package"""

__version__ = "0.1.0"
__author__ = "AI Titan Team"
__description__ = "AI Titan - DeepSeek Agent Automation"
'''
        init_file.write_text(init_content)
        print("✅ Created __init__.py")
    
    # Copy agent.py if it doesn't exist
    agent_file = ai_titan_dir / "agent.py"
    source_agent = Path("app-builder-frontend") / "run_agent.py"
    
    if source_agent.exists() and not agent_file.exists():
        shutil.copy2(source_agent, agent_file)
        print("✅ Copied agent.py to package")
    elif not agent_file.exists():
        print("⚠️  Warning: agent.py not found in expected location")

def create_pyproject_toml():
    """Create or update pyproject.toml"""
    print("\n📝 Setting up pyproject.toml...")
    
    pyproject_content = '''[project]
name = "ai-titan"
version = "0.1.0"
description = "AI Titan - DeepSeek Agent Automation"
authors = [{name = "AI Titan Team"}]
requires-python = ">=3.8"
dependencies = [
  "openai",
  "anthropic",
  "python-dotenv",
  "argparse"
]

[project.scripts]
deepseek-agent = "ai_titan.agent:main"

[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[tool.setuptools.packages.find]
include = ["ai_titan*"]
exclude = ["supabase*", "node_modules*", "app-builder-*", "trae-agent*"]

[tool.uv]
all-extras = true
'''
    
    with open("pyproject.toml", "w", encoding="utf-8") as f:
        f.write(pyproject_content)
    print("✅ Created pyproject.toml")

def install_package():
    """Install the package globally"""
    print("\n📦 Installing package globally...")
    
    # Uninstall existing version first
    run_command("pip uninstall ai-titan -y", "Removing existing installation", check=False)
    
    # Install in development mode
    result = run_command("pip install -e .", "Installing package in development mode")
    return result is not None

def test_installation():
    """Test the global installation"""
    print("\n🧪 Testing installation...")
    
    # Test command line tool
    result = run_command('deepseek-agent "Test installation"', "Testing command line tool", check=False)
    
    if result and result.returncode == 0:
        print("✅ Command line tool working")
    else:
        print("⚠️  Command line tool test completed (may show demo mode)")
    
    # Test Python import
    try:
        import ai_titan.agent
        print("✅ Python import working")
        return True
    except ImportError as e:
        print(f"❌ Python import failed: {e}")
        return False

def create_usage_examples():
    """Create usage examples"""
    print("\n📚 Creating usage examples...")
    
    # Create example script
    example_content = '''#!/usr/bin/env python3
"""
Quick Start Example for AI Titan DeepSeek Agent
"""

from ai_titan.agent import run_deepseek_agent

def main():
    print("🤖 AI Titan DeepSeek Agent - Quick Start")
    print("=" * 40)
    
    # Basic usage
    response = run_deepseek_agent("Write a hello world function in Python")
    print("\\n📝 Response:")
    print(response[:300] + "..." if len(response) > 300 else response)
    
    print("\\n✨ Agent is ready for use in all your projects!")

if __name__ == "__main__":
    main()
'''
    
    with open("quick_start.py", "w", encoding="utf-8") as f:
        f.write(example_content)
    print("✅ Created quick_start.py")

def main():
    print("🚀 AI Titan DeepSeek Agent - Automated Setup")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not Path("app-builder-frontend").exists():
        print("❌ Error: Please run this script from the ai-titan directory.")
        sys.exit(1)
    
    try:
        # Step 1: Create package structure
        create_package_structure()
        
        # Step 2: Create pyproject.toml
        create_pyproject_toml()
        
        # Step 3: Install package
        if install_package():
            # Step 4: Test installation
            if test_installation():
                # Step 5: Create examples
                create_usage_examples()
                
                print("\n🎉 Setup completed successfully!")
                print("\n📋 Quick Usage Guide:")
                print("=" * 30)
                print("\n1. Command line (from anywhere):")
                print("   deepseek-agent \"Your prompt here\"")
                print("   deepseek-agent --interactive")
                print("\n2. In Python projects:")
                print("   from ai_titan.agent import run_deepseek_agent")
                print("   response = run_deepseek_agent('Your prompt')")
                print("\n3. Test with quick start:")
                print("   python quick_start.py")
                print("\n✨ The agent is now available globally!")
            else:
                print("\n⚠️  Installation completed but tests failed.")
                print("You may need to restart your terminal or check your Python environment.")
        else:
            print("\n❌ Installation failed. Please check the errors above.")
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\n\n⏹️  Setup interrupted by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()