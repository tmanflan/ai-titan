#!/usr/bin/env python3
"""
Quick Start Example for AI Titan DeepSeek Agent
"""

from ai_titan.agent import run_deepseek_agent

def main():
    print("🤖 AI Titan DeepSeek Agent - Quick Start")
    print("=" * 40)
    
    # Basic usage
    response = run_deepseek_agent("Write a hello world function in Python")
    print("\n📝 Response:")
    print(response[:300] + "..." if len(response) > 300 else response)
    
    print("\n✨ Agent is ready for use in all your projects!")

if __name__ == "__main__":
    main()
