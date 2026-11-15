"""
Vidya Mitra - Kaggle Free-Tier Fine-Tuning Pipeline
Base Model: Microsoft Phi-3.5-mini-instruct (3.8B) or Gemma-2-2B/9B
Platform: Kaggle GPU (NVIDIA Tesla T4 or P100)
Technique: 4-bit QLoRA with Hugging Face TRL SFTTrainer
"""

# Step 1: Install required libraries (Execute in Kaggle code cell)
# !pip install -q -U transformers datasets trl peft bitsandbytes accelerate

import torch
from datasets import load_dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from trl import SFTTrainer

MODEL_ID = "microsoft/Phi-3.5-mini-instruct"
OUTPUT_DIR = "./vidyamitra-phi3-lora"

def main():
    print("🚀 Initializing Vidya Mitra Fine-Tuning on Kaggle...")
    print(f"CUDA Available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"Device Name: {torch.cuda.get_device_name(0)}")

    # 4-bit Quantization Configuration
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16 if torch.cuda.is_bf16_supported() else torch.float16,
        bnb_4bit_use_double_quant=True,
    )

    # Load Tokenizer
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=True)
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"

    # Load Base Model in 4-bit
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=True,
    )
    model = prepare_model_for_kbit_training(model)

    # LoRA / PEFT Configuration
    peft_config = LoraConfig(
        r=16,
        lora_alpha=32,
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=["qkv_proj", "o_proj", "gate_up_proj", "down_proj"],
    )

    model = get_peft_model(model, peft_config)
    model.print_trainable_parameters()

    # Hyperparameters tuned for Kaggle T4 GPU
    training_args = TrainingArguments(
        output_dir=OUTPUT_DIR,
        per_device_train_batch_size=2,
        gradient_accumulation_steps=8,
        learning_rate=2e-4,
        lr_scheduler_type="cosine",
        logging_steps=10,
        num_train_epochs=3,
        optim="paged_adamw_8bit",
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        save_strategy="epoch",
        report_to="none",
    )

    print("✅ Model setup ready. Next, load train dataset with load_dataset('json', data_files='train.jsonl') and call trainer.train()")

if __name__ == "__main__":
    main()
