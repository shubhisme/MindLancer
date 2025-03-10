from flask import Flask, request, jsonify
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Initialize Flask App
app = Flask(__name__)

# Download necessary NLTK data
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

# Text Cleaning Function
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def preprocess_text(text):
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word not in stop_words]
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    return ' '.join(tokens)

@app.route('/filter_spam', methods=['POST'])
def filter_spam():
    try:
        data = request.json  # Expecting JSON input
        df = pd.DataFrame(data)  # Convert JSON to DataFrame
        
        # Apply text cleaning
        text_columns = ['title', 'company_profile', 'description', 'requirements', 'benefits']
        for col in text_columns:
            if col in df:
                df[col] = df[col].astype(str).apply(clean_text)
                df[f'processed_{col}'] = df[col].apply(preprocess_text)

        # Detect Similar Texts (Spam Detection)
        tfidf_vectorizer = TfidfVectorizer()
        vectorized_texts = tfidf_vectorizer.fit_transform(df['processed_description'])

        similarity_matrix = cosine_similarity(vectorized_texts)
        similarity_threshold = 0.8

        spam_indices = set()
        for i in range(len(df)):
            for j in range(i + 1, len(df)):
                if similarity_matrix[i, j] > similarity_threshold:
                    spam_indices.add(j)

        # Remove spam-like job postings
        df = df.drop(list(spam_indices))

        return jsonify(df.to_dict(orient='records'))  # Return cleaned data as JSON
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
