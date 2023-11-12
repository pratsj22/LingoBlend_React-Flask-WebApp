import nltk
import numpy as np
from sklearn.svm import SVC
from sklearn.feature_extraction.text import TfidfVectorizer


def read_article(text):
    sentences = nltk.sent_tokenize(text)
    return sentences

def create_tfidf_vectors(sentences):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(sentences)
    return tfidf_matrix

def generate_summary(text, percentage):
    sentences = read_article(text)
    tfidf_matrix = create_tfidf_vectors(sentences)
    
    classifier = SVC(kernel='linear')
    classifier.fit(tfidf_matrix, np.arange(len(sentences)))

    decision_function = classifier.decision_function(tfidf_matrix)
    sentence_scores = decision_function.sum(axis=1)

    target_word_count = int(len(text.split()) * (percentage / 100))

    current_word_count = 0
    selected_sentences = []
    for i in np.argsort(-sentence_scores):
        current_word_count += len(sentences[i].split())
        selected_sentences.append(sentences[i])
        if current_word_count >= target_word_count:
            break

    summary = ' '.join(selected_sentences)

    return summary
