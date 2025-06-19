 SMS Spam Detection using ML
A project based on IEEE ICACCS 2021 (19–20 March 2021, Coimbatore, India; added to IEEE Xplore 3 June 2021, DOI: 10.1109/ICACCS51430.2021.9441783).
 Abstract
Mobile users continue increasing globally (1 → 3.8 billion in five years), and so does unwanted SMS spam. In this project, we implemented supervised machine learning and deep learning (LSTM) techniques on the UCI SMS Spam Collection to classify SMS. Our LSTM model achieved 98.5% accuracy, outperforming other models. Implementation and experiments are in Python.

📂 Project Structure
bash
Copy
Edit
├── data/
│   └── sms_spam.csv        # UCI dataset
├── notebooks/
│   └── sms_spam_lstm.ipynb
├── src/
│   ├── preprocess.py       # cleaning, tokenizing, & vectorizing text
│   ├── train_ml.py         # classical ML training (Naive Bayes, SVM, etc.)
│   └── train_lstm.py       # LSTM model training
├── models/
│   └── lstm_spam_model.h5
├── requirements.txt
└── README.md
🚀 Features & Highlights

Data Preprocessing: Cleaned, tokenized, removed stop‑words, text normalization
ML Algorithms: Naive Bayes, Logistic Regression, SVM, Random Forest, etc.
Deep Learning: LSTM-based neural network, tuned for spam classification

Performance:
ML models: ~95–97% accuracy
LSTM model: 98.5% accuracy, highest performance
Reproduction: Reproduce experiments via notebooks or scripts.

🧠 Setup & Usage
Clone the repo:

bash
Copy Edit : git clone https://github.com/YourUsername/your-repo-name.git
cd your-repo-name
Install dependencies:

bash
Copy
Edit : pip install -r requirements.txt

(Optional) Download data : UCI SMS Spam Collection: 5,574 labeled messages 
github.com
+4
github.com
+4
reddit.com
+4
reddit.com
github.com
+3
github.com
+3
phddirection.com
+3
stackoverflow.com
+2
github.com
+2
phddirection.com
+2
arxiv.org
+9
archive.ics.uci.edu
+9
github.com
+9

Run preprocessing:

bash
Copy
Edit
python src/preprocess.py --input data/sms_spam.csv --output data/processed.pkl
Train ML models:

bash
Copy
Edit
python src/train_ml.py --data data/processed.pkl --output models/ml_report.json
Train LSTM model:

bash
Copy
Edit
python src/train_lstm.py --data data/processed.pkl --output models/lstm_spam_model.h5
Evaluate:

Results are saved in models/ml_report.json and the LSTM model’s saved accuracy includes test stats.

📈 Results Summary
Model	Accuracy
Naive Bayes	~95%
SVM / Logistic	~96%
Random Forest	~97%
LSTM (ours)	98.5%

📊 LSTM outperformed all classical models, supporting findings from IEEE ICACCS 2021.

📚 References
Original paper: “SMS Spam Detection using ML & DL” in 7th ICACCS, Coimbatore, India, March 2021 (IEEE)

UCI SMS Spam Collection dataset (5,574 SMS) 
reddit.com
github.com
+3
reddit.com
+3
arxiv.org
+3

🛠️ Tech Stack
Python 3.x

Libraries: pandas, numpy, scikit-learn, TensorFlow/Keras, NLTK

 Future Work
Try transformer‑based models (e.g., BERT) per recent research 
github.com +1
github.com +1
arxiv.org
.

Deploy via API or integrate with messaging platforms.

Enhance with explainability (e.g. SHAP, LIME).
