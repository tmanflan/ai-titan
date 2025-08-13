from openai import OpenAI
import os
def run_agent():
    prompt = "Your agent's task or behavior here"
    # Use DeepSeek Coder API
    client = OpenAI(
        api_key="sk-559cc33a3eb34f7ab59cf4e2f627a644",
        base_url="https://api.deepseek.com"
    )
    response = client.chat.completions.create(
        model="deepseek-coder",
        messages=[{"role": "user", "content": prompt}]
    )
    print(response.choices[0].message.content)

if __name__ == "__main__":
    run_agent()