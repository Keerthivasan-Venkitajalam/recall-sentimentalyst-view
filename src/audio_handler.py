import streamlink
import subprocess
import logging
from typing import Optional

class AudioHandler:
    def __init__(self, source_url: str, duration: int):
        self.source_url = source_url
        self.duration = duration
        self.temp_file = "temp_audio.aac"

    def capture_chunk(self) -> Optional[str]:
        try:
            streams = streamlink.streams(self.source_url)
            if not streams or "best" not in streams:
                logging.error("Streamlink could not find a valid stream.")
                return None
            stream_url = streams["best"].url
        except Exception as e:
            logging.error(f"Streamlink error: {e}")
            return None
        ffmpeg_cmd = [
            "ffmpeg", "-i", stream_url, "-t", str(self.duration), "-vn", "-acodec", "copy", self.temp_file, "-y"
        ]
        try:
            result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
            if result.returncode != 0:
                logging.error(f"ffmpeg error: {result.stderr}")
                return None
            return self.temp_file
        except FileNotFoundError:
            logging.error("ffmpeg is not installed or not found in PATH.")
            return None
        except Exception as e:
            logging.error(f"Subprocess error: {e}")
            return None
