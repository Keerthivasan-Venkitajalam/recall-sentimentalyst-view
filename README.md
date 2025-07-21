# Recall-Driven Sentimentalyst

An autonomous AI trading agent built for the **Encode x Recall 'Autonomous Apes' Hackathon**. This bot listens to live financial news, performs real-time sentiment analysis, and executes trades on the cryptocurrency market.

## Key Features

  - **Real-time Audio Processing:** Ingests live audio from financial news streams.
  - **High-Accuracy Transcription:** Leverages the **Recall API** for fast and accurate speech-to-text conversion.
  - **Advanced Sentiment Analysis:** Uses a fine-tuned NLP model to derive actionable sentiment from text.
  - **Automated Trade Execution:** Places BUY/SELL orders based on configurable logic and keywords.
  - **Modular & Configurable:** Easily adjust trading pairs, thresholds, and data sources.

## How It Works

The agent follows a simple yet powerful workflow:

1.  **Ingest:** Captures live audio in chunks from a specified stream source.
2.  **Transcribe:** Each audio chunk is sent to the **Recall API** for transcription.
3.  **Analyze:** The resulting text is analyzed for sentiment scores and the presence of critical keywords (e.g., "bitcoin", "regulation").
4.  **Decide:** If sentiment crosses a predefined threshold for a specific asset, a BUY or SELL signal is generated.
5.  **Execute:** The signal is sent to a simulated exchange API to autonomously execute the trade.

## Tech Stack

  - **Core:** Python 3.9+
  - **Primary API:** Recall API
  - **NLP / AI:** Hugging Face `transformers`
  - **Dependencies:** `requests`, `python-dotenv`, `websockets`

## Setup and Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/Keerthivasan-Venkitajalam/recall-sentimentalyst-view.git
    cd recall-sentimentalyst
    ```

2.  **Create and activate a virtual environment:**

    ```sh
    python -m venv venv
    source venv/bin/activate
    # On Windows, use: venv\Scripts\activate
    ```

3.  **Install the required dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

## Configuration

Before running the bot, you must configure your API keys and settings.

1.  Create a `.env` file in the root directory from the example template:

    ```sh
    cp config.py .env
    ```

2.  Open the newly created `.env` file and add your credentials obtained from the hackathon platform:

    ```env
    RECALL_API_KEY="YOUR_RECALL_API_KEY_HERE"
    EXCHANGE_API_KEY="YOUR_EXCHANGE_API_KEY_HERE"
    EXCHANGE_API_SECRET="YOUR_EXCHANGE_API_SECRET_HERE"
    # ... and other configurations as needed
    ```

## Usage

To run the trading agent, execute the main script from the root directory:

```sh
python main.py
```

The bot will initialize and begin processing the audio stream. All activities, including detected sentiment and executed trades, will be logged to the console.

-----

*This project was developed for the Encode x Recall Hackathon in July 2025.*
