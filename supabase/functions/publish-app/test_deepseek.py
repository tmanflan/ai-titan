from transformers import AutoTokenizer, AutoModelForCausalLM

model_id = "deepseek-ai/deepseek-coder-6.7B-base"

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

prompt = "def fibonacci(n):"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=100)

print(tokenizer.decode(outputs[0], skip_special_tokens=True))