# img2code Integration Guide

## 1. Install Python dependencies

img2code requires Python 3.6+ and TensorFlow 1.x. It is recommended to use a virtual environment.

```
git clone https://github.com/ashnkumar/img2code.git
cd img2code
pip install -r requirements.txt
```

## 2. Download the pretrained model

Download the model from the img2code repo releases or follow their instructions.

## 3. Run img2code on an image

```
python predict.py --img_path /path/to/image.png --model_path /path/to/model.h5
```

## 4. Backend Integration

The backend will call img2code as a subprocess, passing the uploaded image and reading the output.

---

If you want this automated, ensure Python and TensorFlow are available in your environment.
