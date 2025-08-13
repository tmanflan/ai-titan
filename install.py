#!/usr/bin/env python3
"""
Installation script for AI Titan DeepSeek Agent
This script installs the agent globally so you can use it from any project.
"""

import subprocess
import sys
import os
from pathlib import Path

def run_command(cmd, description):
    """Run a command and handle errors"""
    print(f"\n🔧 {description}...")
    try:
        result = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return result
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during {description}:")
        print(f"Command: {cmd}")
        print(f"Error: {e.stderr}")
        return None

def main():
    print("🚀 AI Titan DeepSeek Agent Installation")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not Path("pyproject.toml").exists():
        print("❌ Error: pyproject.toml not found. Please run this script from the ai-titan directory.")
        sys.exit(1)
    
    # Install in development mode
    print("\n📦 Installing AI Titan package globally...")
    result = run_command("pip install -e .", "Installing package in development mode")
    
    if result:
        print("\n🎉 Installation completed successfully!")
        print("\n📋 Usage Instructions:")
        print("=" * 30)
        print("\n1. From anywhere in your system, run:")
        print("   deepseek-agent \"Your prompt here\"")
        print("\n2. For interactive mode:")
        print("   deepseek-agent --interactive")
        print("\n3. With custom parameters:")
        print("   deepseek-agent \"Your prompt\" --temperature 0.5 --max-tokens 500")
        print("\n4. In your Python projects:")
        print("   from ai_titan.agent import run_deepseek_agent")
        print("   response = run_deepseek_agent('Your prompt')")
        print("\n✨ The agent is now available globally across all your projects!")
    else:
        print("\n❌ Installation failed. Please check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    main()