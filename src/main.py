import os
import time
import logging
import schedule
from dotenv import load_dotenv
from audio_handler import AudioHandler
from transcription_service import RecallTranscriber
from analysis_engine import AnalysisEngine
from trading_client import TradingClient

# Load environment variables
load_dotenv()

# Configuration

RECALL_API_KEY = os.getenv("RECALL_API_KEY")
COINMARKETCAP_API_KEY = os.getenv("COINMARKETCAP_API_KEY")
AUDIO_SOURCE_URL = os.getenv("AUDIO_SOURCE_URL")
TRADING_PAIR = os.getenv("TRADING_PAIR")
TRADE_AMOUNT_USD = float(os.getenv("TRADE_AMOUNT_USD", "100.0"))
CHUNK_DURATION_SECONDS = int(os.getenv("CHUNK_DURATION_SECONDS", "30"))
SENTIMENT_THRESHOLD_BUY = float(os.getenv("SENTIMENT_THRESHOLD_BUY", "0.75"))
SENTIMENT_THRESHOLD_SELL = float(os.getenv("SENTIMENT_THRESHOLD_SELL", "-0.5"))
PRIMARY_KEYWORDS = [kw.strip() for kw in os.getenv("PRIMARY_KEYWORDS", "bitcoin,btc,ethereum,eth,crypto").split(",")]
NEGATIVE_KEYWORDS = [kw.strip() for kw in os.getenv("NEGATIVE_KEYWORDS", "hack,fraud,ban,regulation,sec investigation").split(",")]


# Basic validation
if not RECALL_API_KEY or not COINMARKETCAP_API_KEY:
    logging.error("API keys are not set. Please check your .env file.")
    exit(1)


# Instantiate services
audio_handler = AudioHandler(AUDIO_SOURCE_URL, CHUNK_DURATION_SECONDS)
recall_transcriber = RecallTranscriber(RECALL_API_KEY)
analysis_engine = AnalysisEngine(PRIMARY_KEYWORDS, NEGATIVE_KEYWORDS, SENTIMENT_THRESHOLD_BUY, SENTIMENT_THRESHOLD_SELL)
trading_client = TradingClient(COINMARKETCAP_API_KEY)


def run_bot_cycle():
    print(f"\n--- Starting new analysis cycle --- [{time.strftime('%Y-%m-%d %H:%M:%S')}] ---")
    try:
        audio_file = audio_handler.capture_chunk()
        if not audio_file:
            logging.error("Audio chunk capture failed.")
            return
        transcription = recall_transcriber.transcribe_audio_file(audio_file)
        if not transcription:
            logging.error("Transcription failed.")
            os.remove(audio_file)
            return
        print(f"Transcription: {transcription}")
        analysis = analysis_engine.analyze(transcription)
        print(f"Analysis Result: {analysis}")
        if analysis['signal'] in ['BUY', 'SELL']:
            trading_client.execute_trade(TRADING_PAIR, analysis['signal'], TRADE_AMOUNT_USD)
        os.remove(audio_file)
    except Exception as e:
        logging.error(f"Error in bot cycle: {e}")
        try:
            if audio_file and os.path.exists(audio_file):
                os.remove(audio_file)
        except Exception:
            pass

schedule.every(CHUNK_DURATION_SECONDS).seconds.do(run_bot_cycle)

if __name__ == "__main__":
    print("Recall-Driven Sentimentalyst Bot started.")
    while True:
        schedule.run_pending()
        time.sleep(1)
