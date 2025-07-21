import requests
import logging
from typing import Optional

class RecallTranscriber:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.endpoint = "https://api.recall.ai/api/v1/audio/transcribe"

    def transcribe_audio_file(self, file_path: str) -> Optional[str]:
        headers = {"Authorization": f"Token {self.api_key}"}
        try:
            with open(file_path, "rb") as audio_file:
                files = {"audio": audio_file}
                response = requests.post(self.endpoint, headers=headers, files=files)
            if response.status_code != 200:
                logging.error(f"Recall API Error: {response.status_code} {response.text}")
                return None
            data = response.json()
            return data.get("transcription_text")
        except requests.exceptions.RequestException as e:
            logging.error(f"Recall API Request Exception: {e}")
            return None
        except Exception as e:
            logging.error(f"RecallTranscriber error: {e}")
            return None
