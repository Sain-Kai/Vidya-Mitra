# 🧠 Kaggle LLM Fine-Tuning Guide for Vidya Mitra

This guide provides step-by-step instructions for fine-tuning open-source LLMs on **Kaggle's free GPU tier** (2x NVIDIA Tesla T4 16GB or 1x P100 16GB) to create the dedicated Vidya Mitra Socratic tutor model.

---

## 🎯 Model Comparison & Recommendations

| Model | Parameters | Quantized VRAM | Socratic Reasoning | Indic Language Support | Child Safety & Alignment | Recommended Use |
|---|---|---|---|---|---|---|
| **Microsoft Phi-3.5-mini-instruct** | **3.8B** | **~3.2 GB** | ⭐⭐⭐⭐⭐ (Exceptional for size) | ⭐⭐⭐ (Good, best with English/Hindi) | ⭐⭐⭐⭐ | **Primary Choice (Fast, lean, smart)** |
| **NVIDIA Nemotron-Mini-4B-Instruct** | **4.0B** | **~3.5 GB** | ⭐⭐⭐⭐⭐ (Superb instruction following) | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ (Very high safety) | **Best for Strict Socratic Rules** |
| **Google Gemma-2-9B-IT** | **9.2B** | **~6.8 GB** | ⭐⭐⭐⭐⭐ (Superior reasoning) | ⭐⭐⭐⭐⭐ (Outstanding multilingual) | ⭐⭐⭐⭐ | **Best for High-Resource Multi-Indic** |
| **Google Gemma-2-2B-IT** | **2.6B** | **~2.2 GB** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **Best for On-Device Mobile Edge** |

> 💡 **Recommendation**:
> - Train **Microsoft Phi-3.5-mini** (or **Nemotron-Mini-4B**) as the primary tutor: it fits easily in Kaggle's T4 memory, trains fast (~45 mins on 20k rows), and outputs step-by-step logic effortlessly.
> - For on-device deployment directly inside the mobile app via `llama.rn` or ONNX, quantize **Gemma-2-2B** or **Phi-3.5-mini** to 4-bit GGUF (~2.1 GB).

---

## 🛠️ Step-by-Step Kaggle Training Walkthrough

### Step 1: Create a New Kaggle Notebook
1. Go to [kaggle.com](https://www.kaggle.com) and click **Create** $\to$ **New Notebook**.
2. In the right-hand **Notebook Options** panel:
   - **Accelerator**: Select **GPU T4 x2** (or **GPU P100**).
   - **Internet**: Toggle **On** (mandatory for downloading models & packages).

### Step 2: Install Fine-Tuning Tooling
In the first code cell:
```python
!pip install -q -U transformers datasets trl peft bitsandbytes accelerate
```

### Step 3: Upload the Socratic Dataset
You can upload the generated dataset from `ml-training/dataset_generator/ncert_socratic_train.jsonl` as a Kaggle Dataset, or generate it dynamically in the notebook:
```python
from datasets import load_dataset

dataset = load_dataset("json", data_files="/kaggle/input/vidyamitra-socratic-data/ncert_socratic_train.jsonl")
print(f"Total training examples: {len(dataset['train'])}")
```

### Step 4: Configure 4-Bit QLoRA & SFTTrainer
```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig, TrainingArguments
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from trl import SFTTrainer

MODEL_ID = "microsoft/Phi-3.5-mini-instruct"

# 4-bit NF4 Quantization
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token
tokenizer.padding_side = "right"

model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
)
model = prepare_model_for_kbit_training(model)

peft_config = LoraConfig(
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
    target_modules=["qkv_proj", "o_proj", "gate_up_proj", "down_proj"],
)

training_args = TrainingArguments(
    output_dir="./vidyamitra-phi3-lora",
    per_device_train_batch_size=2,
    gradient_accumulation_steps=8,
    learning_rate=2e-4,
    lr_scheduler_type="cosine",
    num_train_epochs=3,
    optim="paged_adamw_8bit",
    fp16=True,
    logging_steps=10,
    save_strategy="epoch",
    report_to="none",
)

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset["train"],
    peft_config=peft_config,
    max_seq_length=2048,
    tokenizer=tokenizer,
    args=training_args,
)

trainer.train()
```

### Step 5: Save & Export Adapters
```python
trainer.model.save_pretrained("./vidyamitra-final-adapter")
tokenizer.save_pretrained("./vidyamitra-final-adapter")
print("✅ LoRA adapters saved successfully!")
```

### Step 6: Convert to Ollama / GGUF for Deployment
To run in Ollama locally:
1. Merge the LoRA adapter with the base model using `model.merge_and_unload()`.
2. Convert to GGUF using `llama.cpp`'s `convert_hf_to_gguf.py`:
   ```bash
   python llama.cpp/convert_hf_to_gguf.py ./vidyamitra-merged --outtype q4_k_m
   ```
3. Create a `Modelfile`:
   ```dockerfile
   FROM ./vidyamitra-q4_k_m.gguf
   SYSTEM """You are Vidya Mitra, an empathetic Socratic AI tutor for Indian students in Classes 1 to 8. Never give direct answers to homework; guide the student step-by-step with analogies and everyday village/city examples."""
   PARAMETER temperature 0.4
   ```
4. Run in Ollama:
   ```bash
   ollama create vidyamitra -f Modelfile
   ollama run vidyamitra
   ```
