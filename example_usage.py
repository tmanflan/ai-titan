#!/usr/bin/env python3
"""
Example: Using AI Titan DeepSeek Agent in any Python project

This demonstrates how to use the globally installed agent
in your own projects after running the installation.
"""

# Import the agent from the globally installed package
from ai_titan.agent import run_deepseek_agent

def main():
    print("🤖 AI Titan DeepSeek Agent - Usage Example")
    print("=" * 50)
    
    # Example 1: Basic usage
    print("\n📝 Example 1: Basic Code Generation")
    response = run_deepseek_agent("Write a Python function to calculate factorial")
    print("Response:", response[:200] + "..." if len(response) > 200 else response)
    
    # Example 2: With custom parameters
    print("\n🎯 Example 2: Custom Parameters")
    response = run_deepseek_agent(
        "Explain what a REST API is",
        temperature=0.3,  # More focused
        max_tokens=300    # Shorter response
    )
    print("Response:", response[:200] + "..." if len(response) > 200 else response)
    
    # Example 3: Code review helper
    print("\n🔍 Example 3: Code Review Helper")
    sample_code = """
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
"""
    
    response = run_deepseek_agent(
        f"Review this code and suggest improvements:\n{sample_code}"
    )
    print("Review:", response[:200] + "..." if len(response) > 200 else response)
    
    print("\n✨ This agent is now available in ALL your projects!")
    print("\n📚 Usage in your projects:")
    print("   from ai_titan.agent import run_deepseek_agent")
    print("   response = run_deepseek_agent('Your prompt here')")

if __name__ == "__main__":
    main()