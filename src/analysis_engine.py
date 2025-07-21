import logging
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from typing import List, Dict

class AnalysisEngine:
    def __init__(self, primary_keywords: List[str], negative_keywords: List[str], buy_threshold: float, sell_threshold: float):
        self.primary_keywords = [kw.lower() for kw in primary_keywords]
        self.negative_keywords = [kw.lower() for kw in negative_keywords]
        self.buy_threshold = buy_threshold
        self.sell_threshold = abs(sell_threshold)
        self.tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
        self.model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")
        self.labels = ['positive', 'negative', 'neutral']

    def analyze(self, text: str) -> Dict:
        text_lower = text.lower()
        if not any(kw in text_lower for kw in self.primary_keywords):
            return {'signal': 'NEUTRAL', 'reason': 'No keywords found'}
        if any(nkw in text_lower for nkw in self.negative_keywords):
            return {'signal': 'SELL', 'reason': 'Negative keyword detected'}
        inputs = self.tokenizer(text, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**inputs)
            probs = torch.nn.functional.softmax(outputs.logits, dim=1)[0].tolist()
        sentiment = dict(zip(self.labels, probs))
        if sentiment['positive'] > self.buy_threshold:
            return {'signal': 'BUY', 'reason': f'High positive sentiment: {sentiment["positive"]:.2f}'}
        if sentiment['negative'] > self.sell_threshold:
            return {'signal': 'SELL', 'reason': f'High negative sentiment: {sentiment["negative"]:.2f}'}
        return {'signal': 'NEUTRAL', 'reason': 'Sentiment is neutral'}
